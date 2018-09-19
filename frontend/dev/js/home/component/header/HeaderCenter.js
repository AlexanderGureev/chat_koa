import React, { Component } from "react";
import FormBox from "./FormBox";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ForgotPasswordForm from "./ForgotPasswordForm";
import HeaderText from "./HeaderText";
import About from "./About";
import Security from "./Security";
import Faq from "./Faq";
import UserProfile from "../profile";
import ChangePasswordForm from "./ChangePasswordForm";
import FormWrapper from "./FormWrapper";
import PrivateRoute from "./PrivateRoute";
import ProfileWrapper from "../profile/ProfileWrapper";
import FormBoxContainer from "./FormBoxContainer";
import IsMatch from "./IsMatch";
import AboutImg from "./AboutImg";
import FaqImg from "./FaqImg";
import SecurityImg from "./SecurityImg";

const WrappedUserProfile = ProfileWrapper(UserProfile);
const WrappedForgotPasswordForm = FormWrapper(ForgotPasswordForm, {
  url: "/forgot",
  redirectURL: "/forgot"
});
const WrappedResetPasswordForm = FormWrapper(ChangePasswordForm, {
  url: "/resetPassword"
});
const WrappedChangePasswordForm = FormWrapper(ChangePasswordForm, {
  url: "/changePassword"
});

export default function HeaderCenter({ authenticateUser, logout, isAuth }) {
  const getRoutes = () => (
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
          <IsMatch>
            <div className="col-lg-6 text-content">{getRoutes()}</div>
            <Switch>
              <FormBoxContainer>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <FormBox
                      {...props}
                      isAuth={isAuth}
                      authenticateUser={authenticateUser}
                    />
                  )}
                />
                <Route path="/forgot" component={WrappedForgotPasswordForm} />
                <Route
                  path="/resetPassword/:token"
                  component={WrappedResetPasswordForm}
                />
                <PrivateRoute
                  path="/changePassword"
                  component={WrappedChangePasswordForm}
                  isAuth={isAuth}
                />
                <PrivateRoute
                  path="/profile"
                  component={WrappedUserProfile}
                  isAuth={isAuth}
                  logout={logout}
                />
              </FormBoxContainer>
            </Switch>

            <Switch>
              <Route path="/about" component={AboutImg} />
              <Route path="/security" component={FaqImg} />
              <Route path="/faq" component={SecurityImg} />
            </Switch>
            
          </IsMatch>
        </div>
      </div>
    </div>
  );
}
