import React, { Component } from "react";

const User = (props) => {

  const { username, profile: { avatarPath }, handlerOpenProfile } = props;
  return (
    <li onClick={handlerOpenProfile}>
      <img src={avatarPath} alt="avatar" />
      <span className="name">{username}</span>
    </li>
  );
};

export default User;
