import React, { Component } from "react";
import classnames from "classnames";
import Validator from "../../services/validation";
import SocialAuth from "./SocialAuth";
import SimpleTooltip from "./SimpleTooltip";

const validator = new Validator();

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

  validate = (value, type) => validator.isValid(value, type);
  onChangeLogin = ({ target }) => {
    let isValidate = this.validate(target.value, "login");
    this.setState({
      login: {
        target,
        value: target.value.replace(/\s/g, ""),
        isValid: isValidate,
        isInvalid: !isValidate,
        errors: validator.errors,
        isOpenTooltip: !isValidate
      },
      password: {
        ...this.state.password,
        isOpenTooltip: false
      }
    });
  };
  onChangePassword = ({ target }) => {
    let isValidate = this.validate(target.value, "password");

    this.setState({
      login: {
        ...this.state.login,
        isOpenTooltip: false
      },
      password: {
        target,
        value: target.value.replace(/\s/g, ""),
        isValid: isValidate,
        isInvalid: !isValidate,
        errors: validator.errors,
        isOpenTooltip: !isValidate
      }
    });
  };
  getClassNamesInputs = input => {
    return classnames({
      valid: input.isValid,
      invalid: input.isInvalid
    });
  };
  submitForm = e => {
    e.preventDefault();
    const { loginAuth, passAuth } = e.target;

    const loginIsValid = this.validate(loginAuth.value, "login");
    const loginError = validator.errors;
    const passIsValid = this.validate(passAuth.value, "password");
    const passwordError = validator.errors;

    this.setState({
      login: {
        target: loginAuth,
        value: loginAuth.value.replace(/\s/g, ""),
        isValid: loginIsValid,
        isInvalid: !loginIsValid,
        errors: loginError,
        isOpenTooltip: !loginIsValid
      },
      password: {
        target: passAuth,
        value: passAuth.value.replace(/\s/g, ""),
        isValid: passIsValid,
        isInvalid: !passIsValid,
        errors: passwordError,
        isOpenTooltip: !passIsValid
      }
    });

    if (!loginError.length && !passwordError.length) {
      console.log("OK");
    }
  };
  closeTooltip = type => () => {
    this.setState({
      [type]: {
        ...this.state[type],
        isOpenTooltip: false
      }
    });
  };

  render() {
    const { login, password } = this.state;
    let cnForm = classnames({
      "auth-container": true,
      show: this.props.isShow
    });

    return (
      <div className={cnForm}>
        <form
          action="/auth"
          method="post"
          className="auth"
          onSubmit={this.submitForm}
        >
          <input type="hidden" name="_csrf" value="" />
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
            {
              <SimpleTooltip
                isOpen={login.isOpenTooltip}
                target={login.target}
                errors={login.errors}
                onClose={this.closeTooltip("login")}
              />
            }
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
            {
              <SimpleTooltip
                isOpen={password.isOpenTooltip}
                target={password.target}
                errors={password.errors}
                onClose={this.closeTooltip(password)}
              />
            }
          </div>

          <div className="form-group">
            <button type="submit" className="button-ex auth">
              <i className="fas fa-circle-notch fa-spin" />
              Войти
            </button>
            <a href="#" id="btnRegister" onClick={this.props.onClick}>
              Зарегистрировать новый аккаунт
            </a>
            <a href="/forgot" id="btnForgotPassword">
              Забыл пароль?
            </a>
          </div>
          <SocialAuth />
        </form>
      </div>
    );
  }
}
