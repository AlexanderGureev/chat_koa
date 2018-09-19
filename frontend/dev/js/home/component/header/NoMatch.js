import React, { Component } from "react";

const NoMatch = ({ location }) => (
  <div className="noMatch">
    <img src="img/404.gif" alt="page not fount"/>
    <h3>
      Page <code>{location.pathname}</code> not found.
    </h3>
  </div>
);

export default NoMatch;