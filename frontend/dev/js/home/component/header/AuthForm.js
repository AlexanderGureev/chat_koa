import React, { Component } from "react";
import classnames from "classnames";
import Validator from "../../services/validation";

const validator = new Validator();

export default class AuthForm extends Component {
  state = {
    login: {
      value: "",
      isValid: false,
      isInvalid: false,
      errors: []
    },
    password: {
      value: "",
      isValid: false,
      isInvalid: false,
      errors: []
    }
  };

  validate = (value, type) => validator.isValid(value, type);
  showErrors = (target, type) => {
    const { errors } = this.state[type];
    console.log(errors)
    const elemets = target.nextElementSibling;
    console.log(elemets)
    const toolTip = $(elemets).tooltipster({
      theme: ["tooltipster-noir", "tooltipster-noir-customized"],
      animation: "grow",
      multiple: true,
      timer: 10000,
      trigger: "custom"
    });
    toolTip.tooltipster("content", "te").tooltipster("open");
    console.log(toolTip);
  };

  onChangeLogin = ({ target }) => {
    let isValidate = this.validate(target.value, "login");
    if (!isValidate) {
      this.showErrors(target, "login");
    }
    this.setState({
      login: {
        value: target.value.replace(/\s/g, ""),
        isValid: isValidate,
        isInvalid: !isValidate,
        errors: validator.errors
      }
    });
  };
  onChangePassword = ({ target }) => {
    let isValidate = this.validate(target.value, "password");
    if (!isValidate) {
      this.showErrors(target, "password");
    }
    this.setState({
      password: {
        value: target.value.replace(/\s/g, ""),
        isValid: isValidate,
        isInvalid: !isValidate,
        errors: validator.errors
      }
    });
  };
  getClassNamesInputs = input => {
    return classnames({
      valid: input.isValid,
      invalid: input.isInvalid
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
        <form action="/auth" method="post" className="auth">
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
            <div id="tooltipLoginAuth" className="validation" />
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
            <div id="tooltipPasswordAuth" className="validation" />
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
          <div className="socialAuth">
            <a href="/auth/vkontakte">
              <img src="/img/vk.svg" alt="" />
            </a>
            <a href="/auth/google/">
              <img src="/img/google-plus.svg" alt="" />
            </a>
            <a href="/auth/twitter">
              <img src="/img/twitter.svg" alt="" />
            </a>
            <h4>Вход через соц. сети</h4>
          </div>
        </form>
      </div>
    );
  }
}
