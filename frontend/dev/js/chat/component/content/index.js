import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import RightBar from "./RightBar";

const MainChat = props => (
  <div className="main-chat">
    <ChatContainer {...props} />
    <RightBar users={props.users} queueTypingText={props.queueTypingText} />
  </div>
);

export default MainChat;
