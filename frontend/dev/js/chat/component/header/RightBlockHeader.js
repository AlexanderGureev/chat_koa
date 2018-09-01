import React, { Component } from "react";
import Search from "./Search";

const RightBlockHeader = props => (
  <div className="flex-container">
    <div className="link-home">
      <a href="/">Home</a>
    </div>

    <Search />

    <div className="question">
      <i className="fas fa-question" />
    </div>
  </div>
);

export default RightBlockHeader;
