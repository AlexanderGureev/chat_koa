import React, { Component } from "react";
import Post from "./Post";

const Posts = ({messages}) => (
  <div className="posts">
    { messages.map(message => (
      <Post key={message._id} {...message} />
    ))}
  </div>
);

export default Posts;
