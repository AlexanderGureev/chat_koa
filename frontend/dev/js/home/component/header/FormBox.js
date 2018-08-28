import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import AuthForm from "./AuthForm";

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
    return (
      <div className="col-lg-5 offset-lg-1 form-box">
        <div
          className="register-form wow zoomInRight"
          data-wow-duration="1.5s"
          data-wow-delay="1.4s"
        >
          <RegisterForm onClick={this.changeForm} isHide={isHideRegForm} />
          <AuthForm onClick={this.changeForm} isShow={isShowAuthForm} />
        </div>
      </div>
    );
  }
}
