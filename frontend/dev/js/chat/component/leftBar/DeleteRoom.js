import { Popconfirm, message, Icon } from "antd";
import React, { Component } from "react";

const DeleteRoom = ({ deleteRoom, name }) => {

  return (
    <Popconfirm
      title={`Вы уверены, что хотите удалить канал: ${name}?`}
      onConfirm={deleteRoom}
      okText="Да"
      cancelText="Нет"
      placement="right"
      icon={
        <Icon
          type="question-circle-o"
          style={{ bottom: "5px", color: "red" }}
        />
      }
    >
      <a href="#" className="deleteRoom">
        <Icon type="delete" theme="outlined" />
      </a>
    </Popconfirm>
  );
};

export default DeleteRoom;
