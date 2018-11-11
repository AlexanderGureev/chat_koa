import React, { Component } from "react";
import { Icon, Badge } from "antd";

const Scroller = ({isActive = false, onClick = () => {}, unreadMessages}) => {
  return isActive && (
    <div className="scroller" onClick={onClick}>
      { unreadMessages > 0 && <Badge className="scroller-badge" count={unreadMessages} /> }
      <Icon type="down-circle" theme="outlined" />
    </div>
  );
};

export default Scroller;