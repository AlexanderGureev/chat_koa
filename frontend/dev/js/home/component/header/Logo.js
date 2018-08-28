import React, { Component } from "react";

export default function Logo() {
  return (
    <div className="logo wow fadeInLeft" data-wow-delay="1.3s">
      <img src="/img/logo.svg" alt="logo" />
      <a href="/">
        <h1>
          Chater
          <span>Online free chat</span>
        </h1>
      </a>
    </div>
  );
}
