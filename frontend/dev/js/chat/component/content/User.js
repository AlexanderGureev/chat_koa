import React, { Component } from "react";
import cn from "classnames";
import Spinner from "react-spinkit";

const User = props => {
  const classes = cn({
    animated: true,
    bounceInRight: true
  });

  const {
    username,
    profile: { avatarPath },
    handlerOpenProfile,
    isTyping
  } = props;

  return (
    <li className={classes} onClick={handlerOpenProfile}>
      <div className="wrap-rb-online">
        <img src={avatarPath} alt="avatar" />
        {isTyping && <Spinner name="ball-beat" color="steelblue" overrideSpinnerClassName="spinner-typing"/>}
      </div>
      <span className="name">{username}</span>
    </li>
  );
};

export default User;
