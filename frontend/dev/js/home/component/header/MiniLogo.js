import React, { Component } from "react";
import classnames from "classnames";

export default function ToggleMenu(props) {
  let cnLogo = classnames({
    minilogo: true,
    hide: props.isHide
  });

  return (
    <div className={cnLogo}>
      <img src="/img/logo.svg" alt="logo" />
      <h1>Chater</h1>
    </div>
  );
}
