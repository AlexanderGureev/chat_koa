import Transition from "react-transition-group/Transition";
import React, { Component } from "react";

const duration = 150;

const defaultStyle = {
  transition: `opacity ${duration}ms ease`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0, display: "block" },
  entered: { opacity: 1 },
  exited: { display: "none" }
};

const Fade = Component => props => (
  <Transition in={props.in} timeout={duration}>
    {state => (
      <Component
        {...props}
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      />
    )}
  </Transition>
);

export default Fade;
