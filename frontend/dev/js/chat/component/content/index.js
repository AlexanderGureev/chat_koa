import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import RightBar from "./RightBar";

const MainChat = ({users, messages, sendMessage}) => (
  <div className="main-chat">
    <ChatContainer messages={messages} sendMessage={sendMessage}/>
    <RightBar users={users}/>
  </div>
);

export default MainChat;
