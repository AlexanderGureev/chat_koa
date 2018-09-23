import React, { Component } from "react";
import Preloader from "../../../home/component/app/Preloader";
import Header from "../header";
import Content from "../content";
import LeftBar from "../leftBar";
import io from "socket.io-client";

export default class App extends Component {
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
    const { users } = this.state;
    return (
      <React.Fragment>
        <Preloader />
        <div className="overflow-container">
          <Header />
          <LeftBar />
          <Content users={users} />
        </div>
      </React.Fragment>
    );
  }
}
