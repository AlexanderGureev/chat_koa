import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import RightBar from "./RightBar";

const MainChat = props => (
  <div className="main-chat">
    <ChatContainer />
    <RightBar />
  </div>
);

export default MainChat;
