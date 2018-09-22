import React, { Component } from "react";
import classnames from "classnames";
import SocialAuth from "./SocialAuth";
import SimpleTooltip from "./SimpleTooltip";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ButtonEx from "./ButtonEx";

export default class AuthForm extends Component {
  state = {
    loginAuth: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    },
    passAuth: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    }
  };

  removeSpaces = ({ value }) => value.replace(/\s/g, "");
  validationAuthForm = (login, password) => {
    let result = {};
    const { validator } = this.props;
    result.loginAuth = validator.loginValidation(login);
    result.passAuth = validator.passwordValidation(password);

    return result;
  };
  authorizationUser = async ({ target }) => {
    const { loginAuth, passAuth } = this.state;
    const { sendForm } = this.props;
    await sendForm(target, {
      username: loginAuth.value,
      password: passAuth.value
    });
  };
  onChangeInput = ({ target }) => {
    const { validator } = this.props;
    const { isValid, errors } =
      target.name === "loginAuth"
        ? validator.loginValidation(target)
        : validator.passwordValidation(target);

    const newState = Object.keys(this.state).reduce(
      (acc, key) => ({
        ...acc,
        [key]: { ...this.state[key], isOpenTooltip: false }
      }),
      {}
    );

    this.setState({
      ...newState,
      [target.name]: {
        target,
        value: this.removeSpaces(target),
        isValid,
        isInvalid: !isValid,
        errors,
        isOpenTooltip: !isValid
      }
    });
  };
  getClassNamesInputs = ({isValid, isInvalid}) => {
    return classnames({
      valid: isValid,
      invalid: isInvalid
    });
  };
  setFocus = () => {
    const valuesState = Object.values(this.state);
    const input = valuesState.find(({ isInvalid }) => isInvalid);
    if (input) {
      input.target.focus();
    }
  };
  submitForm = e => {
    e.preventDefault();
    const { loginAuth, passAuth } = e.target;
    const res = this.validationAuthForm(loginAuth, passAuth);

    const newState = [loginAuth, passAuth].reduce(
      (acc, input) => ({
        ...acc,
        [input.name]: {
          target: input,
          value: this.removeSpaces(input),
          isValid: res[input.name].isValid,
          isInvalid: !res[input.name].isValid,
          errors: res[input.name].errors,
          isOpenTooltip: !res[input.name].isValid
        }
      }),
      {}
    );

    this.setState(
      {
        ...newState
      },
      this.setFocus
    );

    if (res.loginAuth.isValid && res.passAuth.isValid) {
      this.authorizationUser(e);
    }
  };
  closeTooltips = () => {
    this.setState({
      loginAuth: {
        ...this.state.loginAuth,
        isOpenTooltip: false
      },
      passAuth: {
        ...this.state.passAuth,
        isOpenTooltip: false
      }
    });
  };
  changeForm = e => {
    this.closeTooltips();
    this.props.changeForm(e);
  };

  render() {
    const { loginAuth, passAuth } = this.state;
    let cnForm = classnames({
      "auth-container": true,
      show: this.props.isShow,
      hide: !this.props.isShow
    });

    return (
      <div className={cnForm}>
        <form
          action="/auth"
          method="post"
          className="auth"
          onSubmit={this.submitForm}
        >
          <div className="form-header">
            <h3>Авторизация</h3>
          </div>

          <div className="form-group">
            <label
              htmlFor="loginAuth"
              className={this.getClassNamesInputs(loginAuth)}
            >
              Имя пользователя
            </label>
            <input
              type="text"
              name="loginAuth"
              id="loginAuth"
              value={loginAuth.value}
              onChange={this.onChangeInput}
            />
            <SimpleTooltip {...loginAuth} minLength={4} />
          </div>

          <div className="form-group">
            <label
              htmlFor="passAuth"
              className={this.getClassNamesInputs(passAuth)}
            >
              Пароль
            </label>
            <input
              type="password"
              name="passAuth"
              id="passAuth"
              value={passAuth.value}
              onChange={this.onChangeInput}
            />

            <SimpleTooltip {...passAuth} minLength={4} />
          </div>

          <div className="form-group">
            <ButtonEx isActive={this.props.isLoading}>Войти</ButtonEx>

            <a href="#" id="btnRegister" onClick={this.changeForm}>
              Зарегистрировать новый аккаунт
            </a>
            <Link to="/forgot" id="btnForgotPassword">
              Забыл пароль?
            </Link>
          </div>
          <SocialAuth />
        </form>
      </div>
    );
  }
}
