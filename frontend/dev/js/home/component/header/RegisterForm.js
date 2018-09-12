import React, { Component } from "react";
import classnames from "classnames";
import SimpleTooltip from "./SimpleTooltip";
import ButtonEx from "./ButtonEx";

export default class RegisterForm extends Component {
  state = {
    email: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    },
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
  validationRegForm = (email, login, password) => {
    const { validator } = this.props;
    let result = {};
    result.email = validator.emailValidation(email);
    result.login = validator.loginValidation(login);
    result.password = validator.passwordValidation(password);

    return result;
  };
  registerUser = async ({ target }) => {
    const { email, login, password } = this.state;
    const { sendForm } = this.props;
    await sendForm(target, {
      email: email.value,
      username: login.value,
      password: password.value
    });
  };
  onChangeEmail = ({ target }) => {
    const { validator } = this.props;
    const { isValid, errors } = validator.emailValidation(target);
    this.setState({
      email: {
        target,
        value: this.removeSpaces(target),
        isValid,
        isInvalid: !isValid,
        errors,
        isOpenTooltip: !isValid
      },
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
  onChangeLogin = ({ target }) => {
    const { validator } = this.props;
    const { isValid, errors } = validator.loginValidation(target);
    this.setState({
      email: {
        ...this.state.email,
        isOpenTooltip: false
      },
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
      email: {
        ...this.state.email,
        isOpenTooltip: false
      },
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
  submitForm = e => {
    e.preventDefault();
    const { emailReg, loginReg, passReg } = e.target;
    const { email, login, password } = this.validationRegForm(
      emailReg,
      loginReg,
      passReg
    );

    this.setState({
      email: {
        target: emailReg,
        value: this.removeSpaces(emailReg),
        isValid: email.isValid,
        isInvalid: !email.isValid,
        errors: email.errors,
        isOpenTooltip: !email.isValid
      },
      login: {
        target: loginReg,
        value: this.removeSpaces(loginReg),
        isValid: login.isValid,
        isInvalid: !login.isValid,
        errors: login.errors,
        isOpenTooltip: !login.isValid
      },
      password: {
        target: passReg,
        value: this.removeSpaces(passReg),
        isValid: password.isValid,
        isInvalid: !password.isValid,
        errors: password.errors,
        isOpenTooltip: !password.isValid
      }
    });

    if (email.isValid && login.isValid && password.isValid) {
      this.registerUser(e);
    }
  };
  closeTooltips = () => {
    this.setState({
      email: {
        ...this.state.email,
        isOpenTooltip: false
      },
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
    const { email, login, password } = this.state;
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
              className={this.getClassNamesInputs(email)}
            >
              Электронная почта
            </label>
            <input
              type="text"
              name="emailReg"
              id="emailReg"
              value={email.value}
              onChange={this.onChangeEmail}
            />
            <SimpleTooltip {...email} minLength={4}/>
          </div>

          <div className="form-group">
            <label
              htmlFor="loginReg"
              className={this.getClassNamesInputs(login)}
            >
              Имя пользователя
            </label>
            <input
              type="text"
              name="loginReg"
              id="loginReg"
              value={login.value}
              onChange={this.onChangeLogin}
            />
            <SimpleTooltip {...login} minLength={4}/>
          </div>

          <div className="form-group">
            <label
              htmlFor="passReg"
              className={this.getClassNamesInputs(password)}
            >
              Пароль
            </label>
            <input
              type="password"
              name="passReg"
              id="passReg"
              value={password.value}
              onChange={this.onChangePassword}
            />
            <SimpleTooltip {...password} minLength={4}/>
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
