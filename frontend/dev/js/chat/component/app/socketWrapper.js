import React, { Component } from "react";
import io from "socket.io-client";

const socketWrapper = ComposedComponent => 
  class SocketWrapped extends Component {
    constructor(props) {
      super(props);
      this.socket = io();
    }
    state = {
      users: []
    };
    componentDidMount() {
      this.socket.on("connection_success", users => {
        this.setState({ users });
      });
      this.socket.on("user_connected", users => {
        this.setState({ users });
      });
      this.socket.on("user_disconnect", users => {
        this.setState({ users });
      });
    }

    render() {
      return (
        <ComposedComponent { ...this.props } { ...this.state } />
      )
    }

  }

  export default socketWrapper;