import React, { Component } from "react";
import { Icon } from "antd";

const Scroller = ({isActive = false, onClick = () => {}}) => {
  return isActive && (
    <div className="scroller" onClick={onClick}>
      <Icon type="down-circle" theme="outlined" />
    </div>
  );
};

export default Scroller;