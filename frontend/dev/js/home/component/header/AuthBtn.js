import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function AuthBtn({ isAuth, closeMenu }) {
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
  
  const handleClick = ({target}) => {
    const { tagName } = target;
    tagName === "A" && closeMenu();
  };

  return <div className="auth" onClick={handleClick}>{isAuth ? registerLink() : profileLink()}</div>;
}
