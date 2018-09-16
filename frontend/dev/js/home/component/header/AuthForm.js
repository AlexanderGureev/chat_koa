import React, { Component } from "react";
import classnames from "classnames";
import SocialAuth from "./SocialAuth";
import SimpleTooltip from "./SimpleTooltip";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ButtonEx from "./ButtonEx";

export default class AuthForm extends Component {
  state = {
    login: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    },
    password: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    }
  };

  removeSpaces = input => input.value.replace(/\s/g, "");
  validationAuthForm = (login, password) => {
    let result = {};
    const { validator } = this.props;
    result.login = validator.loginValidation(login);
    result.password = validator.passwordValidation(password);

    return result;
  };
  authorizationUser = async ({ target }) => {
    const { login, password } = this.state;
    const { sendForm } = this.props;
    await sendForm(target, {
      username: login.value,
      password: password.value
    });
  };
  onChangeLogin = ({ target }) => {
    const { validator } = this.props;
    const { isValid, errors } = validator.loginValidation(target);
    this.setState({
      login: {
        target,
        value: this.removeSpaces(target),
        isValid,
        isInvalid: !isValid,
        errors,
        isOpenTooltip: !isValid
      },
      password: {
        ...this.state.password,
        isOpenTooltip: false
      }
    });
  };
  onChangePassword = ({ target }) => {
    const { validator } = this.props;
    const { isValid, errors } = validator.passwordValidation(target);

    this.setState({
      login: {
        ...this.state.login,
        isOpenTooltip: false
      },
      password: {
        target,
        value: this.removeSpaces(target),
        isValid,
        isInvalid: !isValid,
        errors,
        isOpenTooltip: !isValid
      }
    });
  };
  getClassNamesInputs = input => {
    return classnames({
      valid: input.isValid,
      invalid: input.isInvalid
    });
  };
  setFocus = () => {
    const valuesState = Object.values(this.state);
    const input = valuesState.find(({ isInvalid }) => isInvalid);
    if(input) {
      input.target.focus();
    }
  };
  submitForm = e => {
    e.preventDefault();
    const { loginAuth, passAuth } = e.target;

    const { login, password } = this.validationAuthForm(loginAuth, passAuth);

    this.setState({
      login: {
        target: loginAuth,
        value: this.removeSpaces(loginAuth),
        isValid: login.isValid,
        isInvalid: !login.isValid,
        errors: login.errors,
        isOpenTooltip: !login.isValid
      },
      password: {
        target: passAuth,
        value: this.removeSpaces(passAuth),
        isValid: password.isValid,
        isInvalid: !password.isValid,
        errors: password.errors,
        isOpenTooltip: !password.isValid
      },
    }, this.setFocus);

    if (login.isValid && password.isValid) {
      this.authorizationUser(e);
    }
  };
  closeTooltips = () => {
    this.setState({
      login: {
        ...this.state.login,
        isOpenTooltip: false
      },
      password: {
        ...this.state.password,
        isOpenTooltip: false
      }
    });
  };
  changeForm = e => {
    this.closeTooltips();
    this.props.changeForm(e);
  };

  render() {
    const { login, password } = this.state;
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
              className={this.getClassNamesInputs(login)}
            >
              Имя пользователя
            </label>
            <input
              type="text"
              name="loginAuth"
              id="loginAuth"
              value={login.value}
              onChange={this.onChangeLogin}
            />
            <SimpleTooltip {...login} minLength={4}/>
          </div>

          <div className="form-group">
            <label
              htmlFor="passAuth"
              className={this.getClassNamesInputs(password)}
            >
              Пароль
            </label>
            <input
              type="password"
              name="passAuth"
              id="passAuth"
              value={password.value}
              onChange={this.onChangePassword}
            />

            <SimpleTooltip {...password} minLength={4}/>
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
