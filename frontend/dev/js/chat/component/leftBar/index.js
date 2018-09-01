import React, { Component } from "react";
import BarFooter from "./BarFooter";

const LeftBar = props => (
  <div className="left-side-bar">
    <span className="toggle" />
    <div className="collapsed-bar" id="left-bar">
      <div className="closes" />
      <nav>
        <ul>
          <li>
            <a href="#">Profile</a>
          </li>
          <li>
            <a href="#">Messages</a>
          </li>
          <li>
            <a href="#">Settings</a>
          </li>
        </ul>
      </nav>

      <div className="rooms">
        <h3>
          Rooms
          <span className="rooms-add">
            <i className="fas fa-plus" />
          </span>
        </h3>
        <ul>
          <li>
            <a href="">Project manager</a>
          </li>
        </ul>
      </div>
    </div>
    <BarFooter />
  </div>
);

export default LeftBar;
