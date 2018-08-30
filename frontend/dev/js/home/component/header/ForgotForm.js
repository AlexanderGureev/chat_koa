import React, { Component } from "react";

export default class ForgotForm extends Component {
  render() {
    return (
      <div className="forgot-container">
        <form action="/forgot" method="post" className="forgot">
          <input type="hidden" name="_csrf" value="" />
          <div className="form-header">
            <h3>Забыл пароль</h3>
          </div>

          <div className="form-group">
            <label htmlFor="emailForgot">Электронная почта</label>
            <input type="email" name="emailForgot" id="emailForgot" />
            <div id="tooltipEmailForgot" className="validation" />
          </div>

          <div className="form-group">
            <button type="submit" className="button-ex forgot">
              <i className="fas fa-circle-notch fa-spin" />
              Сброс пароля
            </button>
          </div>
        </form>
      </div>
    );
  }
}
