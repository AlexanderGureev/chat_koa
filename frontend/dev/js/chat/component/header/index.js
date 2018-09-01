import React, { Component } from "react";
import Logo from "./Logo";
import RightBlockHeader from "./RightBlockHeader";

const ChatHeader = props => (
  <header className="chat-header">
    <Logo />
    <RightBlockHeader />
  </header>
);

export default ChatHeader;
