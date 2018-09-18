import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import AuthForm from "./AuthForm";
import Validator from "../../services/validation";
import FormWrapper from "./FormWrapper";
import withErrors from "./withErrors";

const WrappedRegForm = withErrors(
  FormWrapper(RegisterForm, { url: "/register", redirectURL: "/profile" })
);
const WrappedAuthForm = FormWrapper(AuthForm, {
  url: "/auth",
  redirectURL: "/profile"
});

const validator = new Validator();

export default class FormBox extends Component {
  state = {
    isShowRegForm: true,
    isShowAuthForm: false
  };

  changeForm = e => {
    e.preventDefault();
    this.setState({
      isShowRegForm: !this.state.isShowRegForm,
      isShowAuthForm: !this.state.isShowAuthForm
    });
  };

  render() {
    const { isShowRegForm, isShowAuthForm } = this.state;
    const { isAuth, authenticateUser } = this.props;
    return (
      <React.Fragment>
        <WrappedRegForm
          changeForm={this.changeForm}
          isShow={isShowRegForm}
          validator={validator}
          isAuth={isAuth}
          authenticateUser={authenticateUser}
        />
        <WrappedAuthForm
          changeForm={this.changeForm}
          isShow={isShowAuthForm}
          validator={validator}
          isAuth={isAuth}
          authenticateUser={authenticateUser}
        />
      </React.Fragment>
    );
  }
}
