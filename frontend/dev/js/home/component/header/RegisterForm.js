import React, { Component } from "react";
import classnames from "classnames";

export default class RegisterForm extends Component {


  render() {
    let cnForm = classnames({
      "register-container": true,
      hide: this.props.isHide
    });

    return (
      <div className={cnForm}>
        <form action="/register" method="post" className="register">
          <input type="hidden" name="_csrf" value="" />
          <div className="form-header">
            <h3>Регистрация</h3>
  
            <span
              className="tooltipError"
              data-tooltip-content="#tooltip_content"
            />
            <div className="tooltip_templates">
              <span id="tooltip_content" />
            </div>
          </div>
  
          <div className="form-group">
            <label htmlFor="emailReg">Электронная почта</label>
            <input type="email" name="emailReg" id="emailReg" />
            <div id="tooltipEmailReg" className="validation" />
          </div>
  
          <div className="form-group">
            <label htmlFor="loginReg">Имя пользователя</label>
            <input type="text" name="loginReg" id="loginReg" />
            <div id="tooltipLoginReg" className="validation" />
          </div>
  
          <div className="form-group">
            <label htmlFor="passReg">Пароль</label>
            <input type="password" name="passReg" id="passReg" />
            <div id="tooltipPasswordReg" className="validation" />
          </div>
  
          <div className="form-group">
            <button type="submit" className="button-ex reg">
              <i className="fas fa-circle-notch fa-spin" />
              Регистрация
            </button>
            <a href="#" id="btnAuth" onClick={this.props.onClick}>
              Уже зарегистрированы?
            </a>
          </div>
        </form>
      </div>
    );
  }
}
