import React, { Component } from "react";
import Search from "./Search";
import { Tooltip } from "antd";

const RightBlockHeader = props => (
  <div className="flex-container">
    <div className="link-home">
      <a href="/">Home</a>
    </div>

    <Search {...props}/>

    <Tooltip placement="bottom" title={"Помощь"}>
      <div className="question">
        <i className="fas fa-question" />
      </div>
    </Tooltip>
  </div>
);

export default RightBlockHeader;
