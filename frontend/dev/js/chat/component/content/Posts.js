import React, { Component } from "react";
import Post from "./Post";

const Posts = ({messages, user_id}) => (
  <div className="posts">
    { messages.map(message => (
      <Post key={message._id} id={user_id} message={message} />
    ))}
  </div>
);

export default Posts;
