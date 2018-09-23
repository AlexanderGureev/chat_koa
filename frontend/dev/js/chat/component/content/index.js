import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import RightBar from "./RightBar";

const MainChat = ({users}) => (
  <div className="main-chat">
    <ChatContainer />
    <RightBar users={users}/>
  </div>
);

export default MainChat;
