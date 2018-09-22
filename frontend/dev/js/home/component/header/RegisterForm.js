import React, { Component } from "react";
import classnames from "classnames";
import SimpleTooltip from "./SimpleTooltip";
import ButtonEx from "./ButtonEx";

export default class RegisterForm extends Component {
  state = {
    emailReg: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    },
    loginReg: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    },
    passReg: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    }
  };

  removeSpaces = ({ value }) => value.replace(/\s/g, "");
  validationRegForm = (email, login, password) => {
    const { validator } = this.props;
    let result = {};
    result.emailReg = validator.emailValidation(email);
    result.loginReg = validator.loginValidation(login);
    result.passReg = validator.passwordValidation(password);

    return result;
  };
  registerUser = async ({ target }) => {
    const { emailReg, loginReg, passReg } = this.state;
    const { sendForm } = this.props;
    await sendForm(target, {
      email: emailReg.value,
      username: loginReg.value,
      password: passReg.value
    });
  };
  onChangeInput = ({ target }) => {
    const { validator } = this.props;
    const { isValid, errors } =
      target.name === "emailReg"
        ? validator.emailValidation(target)
        : target.name === "loginReg"
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
  getClassNamesInputs = ({ isValid, isInvalid }) => {
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
    const { emailReg, loginReg, passReg } = e.target;
    const res = this.validationRegForm(emailReg, loginReg, passReg);

    const newState = [emailReg, loginReg, passReg].reduce(
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

    if (res.emailReg.isValid && res.loginReg.isValid && res.passReg.isValid) {
      this.registerUser(e);
    }
  };
  closeTooltips = () => {
    this.setState({
      emailReg: {
        ...this.state.emailReg,
        isOpenTooltip: false
      },
      loginReg: {
        ...this.state.loginReg,
        isOpenTooltip: false
      },
      passReg: {
        ...this.state.passReg,
        isOpenTooltip: false
      }
    });
  };
  changeForm = e => {
    this.closeTooltips();
    this.props.changeForm(e);
  };

  render() {
    const { emailReg, loginReg, passReg } = this.state;
    let cnForm = classnames({
      "register-container": true,
      show: this.props.isShow,
      hide: !this.props.isShow
    });

    return (
      <div className={cnForm}>
        <form
          action="/register"
          method="post"
          className="register"
          onSubmit={this.submitForm}
        >
          <div className="form-header">
            <h3>Регистрация</h3>
          </div>

          <div className="form-group">
            <label
              htmlFor="emailReg"
              className={this.getClassNamesInputs(emailReg)}
            >
              Электронная почта
            </label>
            <input
              type="text"
              name="emailReg"
              id="emailReg"
              value={emailReg.value}
              onChange={this.onChangeInput}
            />
            <SimpleTooltip {...emailReg} minLength={4} />
          </div>

          <div className="form-group">
            <label
              htmlFor="loginReg"
              className={this.getClassNamesInputs(loginReg)}
            >
              Имя пользователя
            </label>
            <input
              type="text"
              name="loginReg"
              id="loginReg"
              value={loginReg.value}
              onChange={this.onChangeInput}
            />
            <SimpleTooltip {...loginReg} minLength={4} />
          </div>

          <div className="form-group">
            <label
              htmlFor="passReg"
              className={this.getClassNamesInputs(passReg)}
            >
              Пароль
            </label>
            <input
              type="password"
              name="passReg"
              id="passReg"
              value={passReg.value}
              onChange={this.onChangeInput}
            />
            <SimpleTooltip {...passReg} minLength={4} />
          </div>

          <div className="form-group">
            <ButtonEx isActive={this.props.isLoading}>Регистрация</ButtonEx>

            <a href="#" id="btnAuth" onClick={this.changeForm}>
              Уже зарегистрированы?
            </a>
          </div>
        </form>
      </div>
    );
  }
}
