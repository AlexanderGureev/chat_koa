import React, { Component } from "react";
import io from "socket.io-client";
import axios from "axios";

const API_URL_MESSAGES = "api/messages/";

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

        this.getMessages(user).then(messages => {
          const parsedMessages = messages.map(JSON.parse);
          this.setState(
            {
              isLoading: false,
              isLoaded: true,
              messages: parsedMessages
            },
            this.scrollToBottom
          );
        });
      });

      this.socket.on("user_connected", ({ users, user }) => {
        this.setState({ users, user });
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
        const {
          data: { status, message, info }
        } = await axios.get(`${API_URL_MESSAGES}${active_room}`);
        if (status !== 200) {
          throw new Error(message);
        }
        return info;
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

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          sendMessage={this.sendMessage}
        />
      );
    }
  };

export default socketWrapper;
