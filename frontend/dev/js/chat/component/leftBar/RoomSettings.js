import { Popconfirm, Menu, Dropdown, Icon } from "antd";
import React, { Component } from "react";
import DeleteRoom from "./DeleteRoom";

const Item = Menu.Item;
const Divider = Menu.Divider;

const RoomSettings = ({ deleteRoom, _id, name }) => {
  const handleMenuClick = e => {
    e.stopPropagation();
  };

  const renderMenu = (
    <Menu>
      <Item key="0">
        <a href="#">Настройки</a>
      </Item>
      <Item key="1">
        <a href="#">Обзор</a>
      </Item>
      <Divider />
      <Item key="2">
        <DeleteRoom
          name={name}
          deleteRoom={deleteRoom}
          onClick={handleMenuClick}
        />
      </Item>
    </Menu>
  );

  return (
    <div className="room-menu">
      <Dropdown
        placement="topRight"
        overlay={renderMenu}
        trigger={["click"]}
        getPopupContainer={() => document.querySelector("div.room-menu")}
      >
        <span className="btn-room-menu">
          <Icon type="setting" theme="outlined" className="setting-room" />
        </span>
      </Dropdown>
    </div>
  );
};

export default RoomSettings;
