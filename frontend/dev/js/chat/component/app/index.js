import React, { Component } from "react";
import Preloader from "../../../home/component/app/Preloader";
import Header from "../header";
import Content from "../content";
import LeftBar from "../leftBar";
import socketWrapper from "./socketWrapper";

const App = props => {
  const {
    user,
    users,
    messages,
    errors,
    isLoading,
    isLoaded,
    sendMessage
  } = props;

  const { rooms = [] } = user;
  return (
    <React.Fragment>
      <Preloader />
      <div className="overflow-container">
        <Header />
        <LeftBar rooms={rooms} />
        <Content users={users} messages={messages} sendMessage={sendMessage} />
      </div>
    </React.Fragment>
  );
};

export default socketWrapper(App);
