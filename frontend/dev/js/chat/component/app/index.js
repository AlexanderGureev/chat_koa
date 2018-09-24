import React, { Component } from "react";
import Preloader from "../../../home/component/app/Preloader";
import Header from "../header";
import Content from "../content";
import LeftBar from "../leftBar";
import socketWrapper from "./socketWrapper";

const App = ({ users }) => {
  return (
    <React.Fragment>
      <Preloader />
      <div className="overflow-container">
        <Header />
        <LeftBar />
        <Content users={users} />
      </div>
    </React.Fragment>
  );
};

export default socketWrapper(App);
