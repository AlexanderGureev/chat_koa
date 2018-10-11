import React, { Component } from "react";
import Preloader from "../../../home/component/app/Preloader";
import Header from "../header";
import Content from "../content";
import LeftBar from "../leftBar";
import socketWrapper from "./socketWrapper";

const App = props => {
  const {
    user: { rooms = [] },
    handlerInvite,
    location
  } = props;

  if (location.invite) {
    handlerInvite(location.invite.id);
    location.invite = null;
  }

  return (
    <React.Fragment>
      <Preloader/>
      <div className="overflow-container">
        <Header
          roomListIsChange={props.roomListIsChange}
          changeRoomListProcessed={props.changeRoomListProcessed}
        />
        {props.isLoaded && <LeftBar rooms={rooms} {...props} />}
        <Content {...props} />
        )}
      </div>
    </React.Fragment>
  );
};

export default socketWrapper(App);
