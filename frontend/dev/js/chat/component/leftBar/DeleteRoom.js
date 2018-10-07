import { Popconfirm, message, Icon } from "antd";
import React, { Component } from "react";
import cn from "classnames";

const DeleteRoom = ({ deleteRoom, name, onClick, id }) => {
  const handleClick = e => {
    if (e.target.tagName !== "BUTTON") {
      e.stopPropagation();
    }
  };

  return (
    <div className="pop-wrapper" onClick={handleClick}>
      <Popconfirm
        title={`Удалить канал: ${name}?`}
        onConfirm={deleteRoom}
        okText="Да"
        cancelText="Нет"
        placement="right"
      >
        <a href="#" className="deleteRoom" onClick={onClick}>
          Удалить канал
        </a>
      </Popconfirm>
    </div>
  );
};

export default DeleteRoom;
