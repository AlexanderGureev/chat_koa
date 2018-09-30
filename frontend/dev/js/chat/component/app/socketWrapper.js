import React, { Component } from "react";
import io from "socket.io-client";
import {
  getMessages,
  createRoom,
  deleteRoom
} from "../../../home/services/api";
import { notification } from "antd";

const socketWrapper = ComposedComponent =>
  class SocketWrapped extends Component {
    constructor(props) {
      super(props);
      this.socket = io();
    }
    state = {
      users: [],
      user: {},
      messages: [],
      isLoading: false,
      isLoaded: false,
      errors: []
    };

    componentDidMount() {
      this.socketEvents();
    }

    openNotification = () => {
      const { rooms, active_room } = this.state.user;
      const { name } = rooms.find(({ _id }) => _id === active_room);
      
      const online = this.state.users.length;
      const cases = ["2", "3", "4"];

      const fn = lastSymbol =>
        cases.includes(lastSymbol.toString().slice(-1))
          ? "человека."
          : "человек.";

      notification.open({
        message: `Вы зашли в канал: ${name}.`,
        description: `В данном канале ${online} ${fn(online)}`
      });
    };

    scrollToBottom = () => {
      const posts = document.querySelector("div.posts");
      posts.scrollTo({ top: posts.scrollHeight, behavior: "smooth" });
    };

    socketEvents = () => {
      this.socket.on("connection_success", ({ users, user }) => {
        this.setState(
          {
            users,
            user,
            isLoading: true
          },
          this.openNotification
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
              this.scrollToBottom
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
          this.setState(
            {
              messages: [...this.state.messages, message]
            },
            this.scrollToBottom
          );
        } else {
          // увеличить счетчик сообщений комнаты
        }
      });
    };

    sendMessage = message => {
      this.socket.emit("new_message", message);
    };

    getMessages = async ({ active_room }) => {
      try {
        return await getMessages(active_room);
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

        const { _id, name } = await createRoom(room);
        this.socket.emit("update_rooms_list", { _id, name });

        this.setState({
          user: {
            ...this.state.user,
            rooms: [...this.state.user.rooms, { _id, name }]
          }
        });
      } catch (error) {
        console.log(error);
        throw new Error("Произошла ошибка, повторите запрос.");
      }
    };

    deleteRoom = async id => {
      try {
        await deleteRoom(id);
        this.socket.emit("delete_room", id);
      } catch (error) {
        throw new Error("Произошла ошибка, повторите запрос.");
      }
    };

    changeRoom = id => {
      const { active_room } = this.state.user;
      if (id !== active_room) {
        this.socket.emit("change_room", id);
      }
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          createRoom={this.createRoom}
          deleteRoom={this.deleteRoom}
          changeRoom={this.changeRoom}
          sendMessage={this.sendMessage}
        />
      );
    }
  };

export default socketWrapper;
