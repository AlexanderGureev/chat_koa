import React, { Component } from "react";

const MiniProfile = props => {
  return (
    <React.Fragment>
      <div className="header">
        <img src="img/ava.png" alt="" />
        <strong />
      </div>
      <div className="content">
        <ul>
          <li>
            <a href="#">Настройки</a>
          </li>
          <li>
            <a href="#">Друзья</a>
          </li>
          <li>
            <a href="#">Личные сообщения</a>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
};
