import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import RightBar from "./RightBar";

const MainChat = ({users, messages, sendMessage, getMessages, user}) => (
  <div className="main-chat">
    <ChatContainer messages={messages} user={user} sendMessage={sendMessage} getMessages={getMessages} />
    <RightBar users={users}/>
  </div>
);

export default MainChat;
