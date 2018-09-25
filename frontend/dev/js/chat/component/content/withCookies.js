import React, { Component } from "react";
import Cookies from "js-cookie";

const withCookies = (ComposedComponed, name) => props => {
  const cookies = {
    [name]: Cookies.get(name)
  };
  return <ComposedComponed {...props} cookies={cookies} />;
};

export default withCookies;
