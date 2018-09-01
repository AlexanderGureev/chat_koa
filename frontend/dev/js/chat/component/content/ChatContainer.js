import React, { Component } from "react";

const ChatContainer = props => (
  <div className="chat-container">
    <div className="posts" />

    <form action="" className="send-message">
      <input type="text" id="input-message" placeholder="Write something" />
      <a href="#" className="link" />
      <button type="submit" className="send" />
      <a href="#" className="smile" />
    </form>
  </div>
);

export default ChatContainer;
