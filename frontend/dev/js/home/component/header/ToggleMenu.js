import React, { Component } from "react";
import classnames from "classnames";

export default function ToggleMenu(props) {
  let cnHamb = classnames({
    hamb: true,
    focus: props.isFocus
  });

  return (
    <div className="toggle-menu" onClick={props.onClick}>
      <div className={cnHamb} />
    </div>
  );
}
