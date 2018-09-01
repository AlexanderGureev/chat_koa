import React, { Component } from "react";
import Post from "./Post";
import { uniqueId } from "lodash";

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      <h4 className="title">The last 3 posts</h4>
      {posts.map(post => (
        <Post key={uniqueId()} {...post} />
      ))}
    </div>
  );
};

export default Posts;
