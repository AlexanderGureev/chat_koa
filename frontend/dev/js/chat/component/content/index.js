import React, { Component } from "react";
import ChatContainer from "./ChatContainer";
import RightBar from "./RightBar";

const MainChat = ({
  users,
  messages,
  sendMessage,
  getMessages,
  user,
  isLoaded,
  isLoading,
  checkedInvitentions,
  addInviteToChecked,
  setTypingIndicator,
  clearTypingIndicator,
  queueTypingText
}) => (
  <div className="main-chat">
    <ChatContainer
      isLoaded={isLoaded}
      isLoading={isLoading}
      messages={messages}
      user={user}
      sendMessage={sendMessage}
      getMessages={getMessages}
      checkedInvitentions={checkedInvitentions}
      addInviteToChecked={addInviteToChecked}
      setTypingIndicator={setTypingIndicator}
      clearTypingIndicator={clearTypingIndicator}
    />
    <RightBar users={users} queueTypingText={queueTypingText} />
  </div>
);

export default MainChat;
