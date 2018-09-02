import React, { Component } from "react";
import TopLine from "./TopLine";
import HeaderCenter from "./HeaderCenter";
//import NoMatch from "./NoMatch";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default function Header() {
  return (
    <div id="my-page">
      <div id="my-header">
        <Router>
          <header className="site-header">
            <TopLine />
            <Route path="/" component={HeaderCenter} />
          </header>
        </Router>
      </div>
    </div>
  );
}
