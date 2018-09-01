import React, { Component } from "react";
import Friend from "./Friend";
import { uniqueId } from "lodash";

const Friends = ({ friends }) => {
  return (
    <div className="friends">
      <h4 className="title">Friends</h4>

      <div className="flex-box">
        {friends.map(friend => (
          <Friend key={uniqueId()} {...friend} />
        ))}
      </div>
    </div>
  );
};

export default Friends;
