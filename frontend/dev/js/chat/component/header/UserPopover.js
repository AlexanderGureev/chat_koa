import React, { Component, Fragment } from "react";
import { Popover } from 'antd';

const getContent = ({ username, avatarPath }) => (
  <div className="search-user-profile">
    <div className="search-user-header">
      <img src={avatarPath} alt="search-img-ava" />
      <span>{username}</span>
    </div>
    <div className="search-user-body">
      <nav>
        <ul>
          <li><a href="">Написать сообщение</a></li>
          <li><a href="">Добавить в друзья</a></li>
        </ul>
      </nav>
    </div>
  </div>
);
    
const UserPopover = ({ children, userData }) => {

  return (
    <Popover placement="left" content={getContent(userData)}  trigger="click">
      {children}
    </Popover>
  )
}

export default UserPopover;