import React, { Component } from "react";
import FormBox from "./FormBox";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import HeaderText from "./HeaderText";
import About from "./About";
import Security from "./Security";
import Faq from "./Faq";
import UserProfile from "../profile/UserProfile";
// import ChangePasswordForm from "./ChangePasswordForm";


export default function HeaderCenter() {
  const Routes = () => (
    <Switch>
      <Route path="/about" component={About} />
      <Route path="/security" component={Security} />
      <Route path="/faq" component={Faq} />
      <Route path="/" component={HeaderText} />
    </Switch>
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
            
         
              <Switch>
                <Route exact path="/" component={FormBox} />
                <Route path="/forgot" component={ForgotPasswordForm} />
                <Route path="/profile" component={UserProfile} />
              </Switch>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
