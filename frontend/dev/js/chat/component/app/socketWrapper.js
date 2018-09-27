import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";
import {
  getMessages,
  createRoom,
  deleteRoom
} from "../../../home/services/api";

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

    scrollToBottom = () => {
      const posts = document.querySelector("div.posts");
      posts.scrollTo({ top: posts.scrollHeight, behavior: "smooth" });
    };

    socketEvents = () => {
      this.socket.on("connection_success", ({ users, user }) => {
        this.setState({
          users,
          user,
          isLoading: true
        });

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

      this.socket.on("user_connected", users => {
        this.setState({ users });
      });
      this.socket.on("user_disconnect", users => {
        this.setState({ users });
      });

      this.socket.on("rooms_messages_latest", newMessage => {
        const parseMessage = JSON.parse(newMessage);
        this.setState(
          {
            messages: [...this.state.messages, parseMessage]
          },
          this.scrollToBottom
        );
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

    componentDidMount() {
      this.socketEvents();
    }

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
        const deletedRoomId = await deleteRoom(id);
        const filteredRooms = this.state.user.rooms.filter(
          ({ _id }) => _id !== deletedRoomId
        );
        this.setState({
          user: {
            ...this.state.user,
            rooms: filteredRooms
          }
        });
      } catch (error) {
        throw new Error("Произошла ошибка, повторите запрос.");
      }
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          createRoom={this.createRoom}
          deleteRoom={this.deleteRoom}
          sendMessage={this.sendMessage}
        />
      );
    }
  };

export default socketWrapper;
