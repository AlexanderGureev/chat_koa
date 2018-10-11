import React, { Component } from "react";

export default class Preloader extends Component {
  componentDidMount() {
    this.activePreloder();
  }

  activePreloder() {
    $(".preloader")
      .delay(1200)
      .fadeOut("slow");
  }

  render() {
    return (
      <div className="preloader">
        <div className="spinner">
          <div className="dot1" />
          <div className="dot2" />
        </div>
      </div>
    );
  }
}
