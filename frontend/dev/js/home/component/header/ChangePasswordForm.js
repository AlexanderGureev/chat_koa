import React, { Component } from "react";
import Validator from "../../services/validation";
import SimpleTooltip from "./SimpleTooltip";
import classnames from "classnames";
import ButtonEx from "./ButtonEx";
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new Validator();
  }
  state = {
    password: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    },
    confirmPassword: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    }
  };

  removeSpaces = input => input.value.replace(/\s/g, "");
  validationChangePasswordForm = (password, confirmPassword) => {
    let result = {};
    result.password = this.validator.passwordValidation(password);
    result.confirmPassword = this.validator.passwordConfirmValidation(
      password,
      confirmPassword
    );
    return result;
  };
  onChangePassword = ({ target }) => {
    const { isValid, errors } = this.validator.passwordValidation(target);
    this.setState({
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
  onChangeConfirmPassword = ({ target }) => {
    const { password } = this.state;
    const { isValid, errors } = this.validator.passwordConfirmValidation(
      password.target,
      target
    );
    this.setState({
      confirmPassword: {
        target,
        value: this.removeSpaces(target),
        isValid,
        isInvalid: !isValid,
        errors,
        isOpenTooltip: !isValid
      }
    });
  };
  changePassword = async ({ target }) => {
    const { password, confirmPassword } = this.state;
    const { sendForm } = this.props;
    await sendForm(target, {
      passNew: password.value,
      passConfirm: confirmPassword.value
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
    const { passNew, passConfirm } = e.target;
    const { password, confirmPassword } = this.validationChangePasswordForm(
      passNew,
      passConfirm
    );

    this.setState({
      password: {
        target: passNew,
        value: this.removeSpaces(passNew),
        isValid: password.isValid,
        isInvalid: !password.isValid,
        errors: password.errors,
        isOpenTooltip: !password.isValid
      },
      confirmPassword: {
        target: passConfirm,
        value: this.removeSpaces(passConfirm),
        isValid: confirmPassword.isValid,
        isInvalid: !confirmPassword.isValid,
        errors: confirmPassword.errors,
        isOpenTooltip: !confirmPassword.isValid
      }
    }, this.setFocus);

    if (password.isValid && confirmPassword.isValid) {
      this.changePassword(e);
    }
  };

  render() {
    const { password, confirmPassword } = this.state;
    // const { isAuth } = this.props;
    // console.log(isAuth)
    // if (isAuth == false) {
    //   return <Redirect to="/" />;
    // }

    return (
      <div className="change-container">
        <form
          action="/changePassword"
          method="post"
          className="change"
          onSubmit={this.submitForm}
        >
          <div className="form-header">
            <h3>Смена пароля</h3>
          </div>

          <div className="form-group">
            <label
              htmlFor="passNew"
              className={this.getClassNamesInputs(password)}
            >
              Новый пароль
            </label>
            <input
              type="password"
              name="passNew"
              id="passNew"
              value={password.value}
              onChange={this.onChangePassword}
            />
            <SimpleTooltip {...password} minLength={4} />
          </div>

          <div className="form-group">
            <label
              htmlFor="passConfirm"
              className={this.getClassNamesInputs(confirmPassword)}
            >
              Подтвердите пароль
            </label>
            <input
              type="password"
              name="passConfirm"
              id="passConfirm"
              value={confirmPassword.value}
              onChange={this.onChangeConfirmPassword}
            />
            <SimpleTooltip {...confirmPassword} minLength={4} />
          </div>

          <div className="form-group">
          <ButtonEx isActive={this.props.isLoading}>Сменить пароль</ButtonEx>
          </div>
        </form>
      </div>
    );
  }
}
