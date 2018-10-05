import React, { Component } from "react";;
import Spinner from "react-spinkit";


const LoadingBar = props => (
  <div className="loading-bar">
    <Spinner name="ball-pulse-sync" className="loading-spinner" fadeIn="none"/>
  </div>
);

export default LoadingBar;