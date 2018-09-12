import React, { Component } from "react";
import Validator from "../../services/validation";
import SimpleTooltip from "./SimpleTooltip";
import classnames from "classnames";
import ButtonEx from "./ButtonEx";

export default class ForgotPasswordForm extends Component {
  constructor() {
    super();
    this.validator = new Validator();
  }
  state = {
    email: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    }
  };

  removeSpaces = input => input.value.replace(/\s/g, "");
  validationForgotForm = email => {
    let result = {};
    result.email = this.validator.emailValidation(email);
    return result;
  };
  onChangeEmail = ({ target }) => {
    const { isValid, errors } = this.validator.emailValidation(target);
    this.setState({
      email: {
        target,
        value: this.removeSpaces(target),
        isValid,
        isInvalid: !isValid,
        errors,
        isOpenTooltip: !isValid
      }
    });
  };
  forgotPassword = async ({ target }) => {
    const { email } = this.state;
    const { sendForm } = this.props;
    await sendForm(target, {
      email: email.value,
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
    const { emailForgot } = e.target;

    const { email } = this.validationForgotForm(emailForgot);

    this.setState({
      email: {
        target: emailForgot,
        value: this.removeSpaces(emailForgot),
        isValid: email.isValid,
        isInvalid: !email.isValid,
        errors: email.errors,
        isOpenTooltip: !email.isValid
      }
    });

    if (email.isValid) {
      this.forgotPassword(e);
    }
  };

  render() {
    const { email } = this.state;
    return (
      <div className="forgot-container">
        <form
          action="/forgot"
          method="post"
          className="forgot"
          onSubmit={this.submitForm}
        >
          <div className="form-header">
            <h3>Забыл пароль</h3>
          </div>

          <div className="form-group">
            <label
              htmlFor="emailForgot"
              className={this.getClassNamesInputs(email)}
            >
              Электронная почта
            </label>
            <input
              type="text"
              name="emailForgot"
              id="emailForgot"
              value={email.value}
              onChange={this.onChangeEmail}
            />
            <SimpleTooltip {...email} minLength={4}/>
          </div>

          <div className="form-group">
            <ButtonEx isActive={this.props.isLoading}>Отправить</ButtonEx>
          </div>
        </form>
      </div>
    );
  }
}
