import React, { Component } from "react";
import Preloader from "./Preloader";
import Header from "../header";
import Content from "../content";
import Footer from "../footer";
import { WOW } from "wowjs";

export default class App extends Component {
  componentDidMount() {
    new WOW({
      live: false
    }).init();
  }

  render() {
    return (
      <React.Fragment>
        <Preloader />
        <Header />
        <Content />
        <Footer />
      </React.Fragment>
    );
  }
}
