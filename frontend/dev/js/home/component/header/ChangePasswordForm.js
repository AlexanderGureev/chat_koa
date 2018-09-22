import React, { Component } from "react";
import Validator from "../../services/validation";
import SimpleTooltip from "./SimpleTooltip";
import classnames from "classnames";
import ButtonEx from "./ButtonEx";
import { BrowserRouter as Router, Redirect } from "react-router-dom";

export default class ForgotPasswordForm extends Component {
  constructor(props) {
    super(props);
    this.validator = new Validator();
  }
  state = {
    passNew: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    },
    passConfirm: {
      target: null,
      value: "",
      isValid: false,
      isInvalid: false,
      isOpenTooltip: false,
      errors: []
    }
  };

  removeSpaces = ({ value }) => value.replace(/\s/g, "");
  validationChangePasswordForm = (password, confirmPassword) => {
    let result = {};
    result.passNew = this.validator.passwordValidation(password);
    result.passConfirm = this.validator.passwordConfirmValidation(
      password,
      confirmPassword
    );
    return result;
  };
  onChangeInput = ({ target }) => {
    const { isValid, errors } =
      target.name === "passNew"
        ? this.validator.passwordValidation(target)
        : this.validator.passwordConfirmValidation(
            this.state.passNew.target,
            target
          );

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
  changePassword = async ({ target }) => {
    const { passNew, passConfirm } = this.state;
    const { sendForm } = this.props;
    await sendForm(target, {
      passNew: passNew.value,
      passConfirm: passConfirm.value
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
    const { passNew, passConfirm } = e.target;
    const res = this.validationChangePasswordForm(passNew, passConfirm);
    const newState = [passNew, passConfirm].reduce(
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

    if (res.passNew.isValid && res.passConfirm.isValid) {
      this.changePassword(e);
    }
  };

  render() {
    const { passNew, passConfirm } = this.state;

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
              className={this.getClassNamesInputs(passNew)}
            >
              Новый пароль
            </label>
            <input
              type="password"
              name="passNew"
              id="passNew"
              value={passNew.value}
              onChange={this.onChangeInput}
            />
            <SimpleTooltip {...passNew} minLength={4} />
          </div>

          <div className="form-group">
            <label
              htmlFor="passConfirm"
              className={this.getClassNamesInputs(passConfirm)}
            >
              Подтвердите пароль
            </label>
            <input
              type="password"
              name="passConfirm"
              id="passConfirm"
              value={passConfirm.value}
              onChange={this.onChangeInput}
            />
            <SimpleTooltip {...passConfirm} minLength={4} />
          </div>

          <div className="form-group">
            <ButtonEx isActive={this.props.isLoading}>Сменить пароль</ButtonEx>
          </div>
        </form>
      </div>
    );
  }
}
