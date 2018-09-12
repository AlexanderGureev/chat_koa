import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function AuthBtn({ isAuth }) {
  const registerLink = () => (
    <Link to="/profile" className="button">
      Профиль
    </Link>
  );
  const profileLink = () => (
    <Link to="/" className="button">
      Войти
    </Link>
  );

  return <div className="auth">{isAuth ? registerLink() : profileLink()}</div>;
}
