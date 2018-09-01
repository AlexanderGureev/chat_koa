import React, { Component } from "react";

const Post = ({text, date}) => {
  return (
    <div className="post">
      <p className="post-text">{text}</p>
      <div className="date">
        <p>{date}</p>
      </div>
    </div>
  );
};

export default Post;