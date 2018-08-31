import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="logo wow fadeInLeft" data-wow-delay="1.3s">
      <img src="/img/logo.svg" alt="logo" />
      <Link to="/">
        <h1>
          Chater
          <span>Online free chat</span>
        </h1>
      </Link>
    </div>
  );
}
