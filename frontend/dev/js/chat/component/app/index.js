import React, { Component } from "react";
import Preloader from "../../../home/component/app/Preloader";
import Header from "../header";
import Content from "../content";
import LeftBar from "../leftBar";

export default class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Preloader />
        <div className="overflow-container">
          <Header />
          <Content />
          <LeftBar />
        </div>
      </React.Fragment>
    );
  }
}
