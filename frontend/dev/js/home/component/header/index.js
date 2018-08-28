import React, { Component } from "react";
import TopLine from "./TopLine";
import HeaderCenter from "./HeaderCenter";

export default function Header() {
  return (
    <div id="my-page">
      <div id="my-header">
        <header className="site-header">
          <TopLine />
          <HeaderCenter />
        </header>
      </div>
    </div>
  );
}
