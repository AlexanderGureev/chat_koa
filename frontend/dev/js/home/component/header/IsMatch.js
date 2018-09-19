import React, { Component } from "react";
import NoMath from "./NoMatch";

const IsMatch = ({ children }) => {
  const fn = ({ props }) => props.path === location.pathname;
  const iter = ({ props }) => {
    const { children } = props;
    if (children instanceof Array) {
      return children;
    }
    return iter(props.children);
  };

  const mass = children.map(iter);
  const isMatchCount = mass.reduce((acc, curr) => {
    let count = curr.filter(fn);
    return count.length > 0 ? (acc += count.length) : acc;
  }, 0);

  return isMatchCount > 0 ? (
    children
  ) : (
    <NoMath location={location} />
  );
};

export default IsMatch;