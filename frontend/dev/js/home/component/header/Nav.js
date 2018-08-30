import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <ul>
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
          <Link to="faq">FAQ</Link>
        </li>
      </ul>
    </nav>
  );
}
