import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import RightBar from "./RightBar";

const MainChat = ({users, messages, sendMessage, user_id}) => (
  <div className="main-chat">
    <ChatContainer messages={messages} user_id={user_id} sendMessage={sendMessage}/>
    <RightBar users={users}/>
  </div>
);

export default MainChat;
