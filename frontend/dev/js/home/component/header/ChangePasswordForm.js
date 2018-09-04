import React, { Component } from "react";
import Validator from "../../services/validation";
import SimpleTooltip from "./SimpleTooltip";
import classnames from "classnames";

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
    },
    sendingForm: false
  };

  componentDidMount() {
    console.log(this.props.params);
  }
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
      },
      sendingForm: false
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
      },
      sendingForm: false
    });
  };
  changePassword = () => {
    console.log("OK");
  };
  getClassNamesInputs = input => {
    return classnames({
      valid: input.isValid,
      invalid: input.isInvalid
    });
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
      },
      sendingForm: true
    });

    if (password.isValid && confirmPassword.isValid) {
      this.changePassword();
    }
  };

  render() {
    const { password, confirmPassword, sendingForm } = this.state;
    return (
      <div className="change-container">
        <form
          action="/changePassword"
          method="post"
          className="change"
          onSubmit={this.submitForm}
        >
          <input type="hidden" name="_csrf" value="" />
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
            <SimpleTooltip {...password} sendingForm={sendingForm} />
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
            <SimpleTooltip {...confirmPassword} sendingForm={sendingForm} />
          </div>

          <div className="form-group">
            <button type="submit" className="button-ex change">
              <i className="fas fa-circle-notch fa-spin" />
              Сменить пароль
            </button>
          </div>
        </form>
      </div>
    );
  }
}
