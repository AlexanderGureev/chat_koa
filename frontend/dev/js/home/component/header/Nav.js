import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function Nav(props) {
  const closeMenu = ({target}) => {
    const { tagName } = target;
    tagName === "A" && props.closeMenu();
  }
  return (
    <nav>
      <ul onClick={closeMenu}>
        <li>
          <Link to="/">Главная</Link>
        </li>
        <li>
          <Link to="/about">Функции</Link>
        </li>
        <li>
          <Link to="/security">Безопасность</Link>
        </li>
        <li>
          <Link to="/faq">FAQ</Link>
        </li>
      </ul>
    </nav>
  );
}
