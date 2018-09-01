import React, { Component } from "react";

const Friend = ({ avatarUrl }) => {
  return (
    <div className="friend">
      <div className="ava">
        <img src={avatarUrl} alt="" />
      </div>
    </div>
  );
};

export default Friend;
