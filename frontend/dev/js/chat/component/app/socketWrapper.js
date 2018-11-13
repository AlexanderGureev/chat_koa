import React, { Component, Fragment } from "react";
import io from "socket.io-client";
import {
  getMessages,
  createRoom,
  deleteRoom,
  checkInviteLink,
  checkRoomPassword
} from "../../../home/services/api";
import { notification, message as messageAntd } from "antd";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
  Switch
} from "react-router-dom";
import ModalInvitePassword from "./ModalInvitePassword";

const socketWrapper = ComposedComponent =>
  class SocketWrapped extends Component {
    constructor(props) {
      super(props);
      this.socket = io();
      this.queueOperations = [];
      this.invite = {};
      this.unreadMessageTime = 5000;
    }
    state = {
      users: [],
      user: {},
      messages: [],
      isLoading: false,
      isLoaded: false,
      errors: [],
      roomListIsChange: false,
      checkedInvitentions: {},
      visibleModal: false,
      confirmLoadingModal: false,
      queueTypingText: []
    };

    componentDidMount() {
      this.socketEvents();
    }
    checkQueue = () => {
      if (this.queueOperations.length) {
        const operation = this.queueOperations.shift();
        operation();
      }
    };
    getDescriptionNotification = () => {
      const { rooms, active_room } = this.state.user;
      const { name, unread_messages = 0, leave_date = "" } = rooms.find(
        ({ _id }) => _id === active_room
      );

      const online = this.state.users.length;
      const cases = ["2", "3", "4"];

      const fn = lastSymbol =>
        cases.includes(lastSymbol.toString().slice(-1))
          ? "человека."
          : "человек.";

      const description = (
        <div className="notify-desc">
          <p>
            В данном канале {online} {fn(online)}
          </p>
          <p>
            {leave_date
              ? `Дата последнего посещения: ${new Date(
                  leave_date
                ).toLocaleString()}.`
              : ""}
          </p>
          <p>
            {unread_messages
              ? `Количество непрочитанных сообщений: ${unread_messages}.`
              : ""}
          </p>
        </div>
      );

      return {
        message: `Вы зашли в канал: ${name}.`,
        description
      };
    };
    openNotification = () =>
      notification.open(this.getDescriptionNotification());
    markAsRead = () => {
      const { rooms, active_room } = this.state.user;
      const updatedRooms = rooms.map(room => {
        if (room._id === active_room) {
          room.unread_messages = 0;
        }
        return room;
      });
      this.setState({
        user: {
          ...this.state.user,
          rooms: updatedRooms
        }
      });
    };

    socketEvents = () => {
      this.socket.on("connection_success", ({ users, user }) => {
        this.setState(
          {
            users,
            user,
            isLoading: true,
            isLoaded: false
          },
          () => {
            //this.openNotification();
            setTimeout(this.markAsRead, this.unreadMessageTime);
          }
        );

        this.getMessages(user)
          .then(data => {
            return data.map(JSON.parse);
          })
          .then(messages => {
            this.setState(
              {
                isLoading: false,
                isLoaded: true,
                messages
              },
              this.checkQueue
            );
          });
      });
      this.socket.on("user_connected", ({ users, room_id }) => {
        const { active_room } = this.state.user;
        if (room_id === active_room) {
          this.setState({ users });
        }
      });
      this.socket.on("user_disconnect", ({ users, room_id }) => {
        const { active_room } = this.state.user;
        if (room_id === active_room) {
          this.setState({ users });
        }
      });
      this.socket.on("rooms_messages_latest", newMessage => {
        const message = JSON.parse(newMessage);
        const { active_room } = this.state.user;

        if (message.room_id === active_room) {
          this.setState({
            messages: [...this.state.messages, message]
          });
        } else {
          const { rooms } = this.state.user;
          const roomsWithMessage = rooms.reduce(
            (acc, room) =>
              room._id === message.room_id
                ? [
                    ...acc,
                    { ...room, unread_messages: ++room.unread_messages || 1 } //default value необходимо в случае создании новой комнаты (когда комната только что создана, у нее нет поля прочитанных сообщений)
                  ]
                : [...acc, room],
            []
          );

          this.setState({
            user: {
              ...this.state.user,
              rooms: roomsWithMessage
            }
          });
        }
      });
      this.socket.on("typing", queueTypingText => this.setState({ queueTypingText }));
    };

    sendMessage = message => {
      this.clearTypingIndicator();
      this.socket.emit("new_message", message);
    };

    getMessages = async (user, start = -20, end = -1) => {
      try {
        const { active_room, rooms } = user;
        const { unread_messages } = rooms.find(({ _id }) => _id === active_room);
        if(unread_messages > 15) {
          start = -(unread_messages + 20);
        }
        return await getMessages(active_room, start, end);
      } catch ({ message }) {
        const errors = message instanceof Array ? message : [message];
        this.setState({
          isLoading: false,
          isLoaded: true,
          errors
        });
      }
    };

    createRoom = async ({ roomName, modifier, passwordRoom }) => {
      try {
        const room = {
          room_author: this.state.user._id,
          name: roomName,
          public: modifier === "public" ? true : false
        };
        if (!room.public) {
          room.password = passwordRoom;
        }

        const newRoom = await createRoom(room);
        this.socket.emit("update_rooms_list", newRoom);

        this.setState({
          roomListIsChange: true,
          user: {
            ...this.state.user,
            rooms: [...this.state.user.rooms, { ...newRoom }]
          }
        });
      } catch (error) {
        console.log(error);
        throw new Error("Произошла ошибка, повторите запрос.");
      }
    };

    deleteRoom = async id => {
      try {
        const { rooms } = this.state.user;
        await deleteRoom(id);
        this.setState({ roomListIsChange: true });
        this.socket.emit("delete_room", { id, rooms });
      } catch (error) {
        throw new Error("Произошла ошибка, повторите запрос.");
      }
    };

    changeRoomListProcessed = () => {
      this.setState({ roomListIsChange: false });
    };

    changeRoom = id => {
      const { active_room, rooms } = this.state.user;
      if(this.state.queueTypingText.length) {
        this.clearTypingIndicator();
      }
      if (id !== active_room) {
        this.socket.emit("change_room", { id, rooms });
      }
    };

    setTypingIndicator = () => this.socket.emit("user_typing_start");
    clearTypingIndicator = () => this.socket.emit("user_typing_end");

    addInviteToChecked = (id, invite) => {
      const { checkedInvitentions } = this.state;
      this.setState({
        checkedInvitentions: {
          ...checkedInvitentions,
          [id]: { ...invite }
        }
      });
    };
    showModal = () => {
      setTimeout(() => {
        this.setState({
          visibleModal: true
        });
      }, 2000);
    };
    handleCancel = () => {
      this.setState({
        visibleModal: false
      });
    };
    handleCreate = () => {
      const form = this.formRef.props.form;
      form.validateFields(async (err, values) => {
        if (err) {
          return;
        }
        this.setState({ confirmLoadingModal: true });
        try {
          await checkRoomPassword({ ...values, room_id: this.invite.room_id });
          form.resetFields();
          this.setState({ visibleModal: false, confirmLoadingModal: false });
          this.socket.emit("call_invitation", this.invite.invitation_id);
        } catch (err) {
          messageAntd.error(err.message);
          this.setState({ confirmLoadingModal: false });
        }
      });
    };
    saveFormRef = formRef => {
      this.formRef = formRef;
    };
    handlerInvite = async id => {
      if (!this.state.isLoaded) {
        this.queueOperations.push(() => this.handlerInvite(id));
        return;
      }

      const { checkedInvitentions } = this.state;
      try {
        if (checkedInvitentions[id]) {
          this.invite = checkedInvitentions[id];
        } else {
          this.invite = await checkInviteLink(id);
          this.addInviteToChecked(id, this.invite);
        }

        const isAdded = this.state.user.rooms.find(
          ({ _id }) => _id === this.invite.room_id
        );

        if (isAdded) {
          return messageAntd.warning(
            `Канал ${this.invite.room_name} уже добавлен.`
          );
        }

        if (!this.invite.room_public) {
          return this.showModal();
        }
        return this.socket.emit("call_invitation", this.invite.invitation_id);
      } catch (error) {
        console.log(error);
        messageAntd.error(`Данное приглашение недействительно.`);
      }
    };

    render() {
      const { visibleModal, confirmLoadingModal } = this.state;
      return (
        <Router>
          <Fragment>
            <ModalInvitePassword
              wrappedComponentRef={this.saveFormRef}
              invite={this.invite}
              visible={visibleModal}
              confirmLoading={confirmLoadingModal}
              handleCancel={this.handleCancel}
              onCreate={this.handleCreate}
            />
            <Route
              path="/chat/:id?"
              render={props => {
                const {
                  match: { params }
                } = props;

                return params.id ? (
                  <Redirect
                    to={{ pathname: "/chat", invite: { id: params.id } }}
                  />
                ) : (
                  <ComposedComponent
                    {...props}
                    {...this.props}
                    {...this.state}
                    createRoom={this.createRoom}
                    deleteRoom={this.deleteRoom}
                    changeRoom={this.changeRoom}
                    sendMessage={this.sendMessage}
                    getMessages={this.getMessages}
                    changeRoomListProcessed={this.changeRoomListProcessed}
                    handlerInvite={this.handlerInvite}
                    addInviteToChecked={this.addInviteToChecked}
                    setTypingIndicator={this.setTypingIndicator}
                    clearTypingIndicator={this.clearTypingIndicator}
                  />
                );
              }}
            />
          </Fragment>
        </Router>
      );
    }
  };

export default socketWrapper;
