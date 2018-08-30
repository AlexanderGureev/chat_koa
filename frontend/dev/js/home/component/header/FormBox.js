import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import AuthForm from "./AuthForm";
import Validator from "../../services/validation";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class FormBox extends Component {
  state = {
    isHideRegForm: false,
    isShowAuthForm: false
  };

  changeForm = e => {
    e.preventDefault();
    this.setState({
      isHideRegForm: !this.state.isHideRegForm,
      isShowAuthForm: !this.state.isShowAuthForm
    });
  };

  render() {
    let { isHideRegForm, isShowAuthForm } = this.state;
    const validator = new Validator();
    return (
      <React.Fragment>
        <RegisterForm
          onClick={this.changeForm}
          isHide={isHideRegForm}
          validator={validator}
        />
        <AuthForm
          onClick={this.changeForm}
          isShow={isShowAuthForm}
          validator={validator}
        />
      </React.Fragment>
    );
  }
}
