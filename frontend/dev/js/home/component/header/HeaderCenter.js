import React, { Component } from "react";
import FormBox from "./FormBox";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import HeaderText from "./HeaderText";
import About from "./About";
import Security from "./Security";
import Faq from "./Faq";

// import ChangePasswordForm from "./ChangePasswordForm";

export default function HeaderCenter() {
  const Routes = () => (
    <React.Fragment>
      <Route exact path="/" component={HeaderText} />
      <Route exact path="/forgot" component={HeaderText} />
      <Route exact path="/about" component={About} />
      <Route exact path="/security" component={Security} />
      <Route exact path="/faq" component={Faq} />
    </React.Fragment>
  );

  return (
    <div className="header-center">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <Routes />
          </div>
          <div className="col-lg-5 offset-lg-1 form-box">
            <div
              className="register-form wow zoomInRight"
              data-wow-duration="1.5s"
              data-wow-delay="1.4s"
            >
              <Route exact path="/" component={FormBox} />
              <Route path="/forgot" component={ForgotPasswordForm} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
