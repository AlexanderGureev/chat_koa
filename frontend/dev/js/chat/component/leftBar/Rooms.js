import React, { Component } from "react";

const Rooms = ({ rooms }) => (
  <div className="rooms">
    <h3>
      Rooms
      <span className="rooms-add">
        <i className="fas fa-plus" />
      </span>
    </h3>
    <ul>
      {rooms.map(({ _id, name }) => (
        <li key={_id}>
          <a href="">{name}</a>
        </li>
      ))}
    </ul>
  </div>
);

export default Rooms;
