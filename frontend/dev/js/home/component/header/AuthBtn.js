import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default function AuthBtn() {
  return (
    <div className="auth">
      <Link to="/profile" className="button">
        Профиль
      </Link>
    </div>
  );
}
