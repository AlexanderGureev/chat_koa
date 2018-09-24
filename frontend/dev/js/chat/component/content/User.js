import React, { Component } from "react";
import cn from "classnames";

const User = props => {
  const classes = cn({
    animated: true,
    bounceInRight: true
  });

  const {
    username,
    profile: { avatarPath },
    handlerOpenProfile
  } = props;

  return (
    <li className={classes} onClick={handlerOpenProfile}>
      <img src={avatarPath} alt="avatar" />
      <span className="name">{username}</span>
    </li>
  );
};

export default User;
