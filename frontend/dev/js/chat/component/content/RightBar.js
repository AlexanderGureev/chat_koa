import React, { Component } from "react";

const RightBar = props => (
  <div className="right-side-bar">
    <h3>
      Online -<span className="online-count"> 0 </span>
    </h3>
    <ul className="userOnline" />
  </div>
);

export default RightBar;
