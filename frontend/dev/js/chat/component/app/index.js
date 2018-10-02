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
    sendMessage,
    deleteRoom,
    createRoom,
    changeRoom,
    getMessages
  } = props;

  const { rooms = [], _id } = user;
  return (
    <React.Fragment>
      <Preloader />
      <div className="overflow-container">
        <Header />
        <LeftBar
          rooms={rooms}
          createRoom={createRoom}
          deleteRoom={deleteRoom}
          changeRoom={changeRoom}
        />
        {isLoaded && (
          <Content
            users={users}
            user={user}
            messages={messages}
            sendMessage={sendMessage}
            getMessages={getMessages}
          />
        )}
      </div>
    </React.Fragment>
  );
};

export default socketWrapper(App);
