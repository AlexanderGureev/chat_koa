import React, { Component } from "react";
import classnames from "classnames";
import SimpleTooltip from "./SimpleTooltip";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

const FormWrapper = ComposedComponent =>
  class extends Component {
    state = {
      loginForm: null,
      errors: [],
      isLoading: false,
      isLoaded: false
    };

    noop = async () => new Promise((res, rej) => setTimeout(() => { res(2) }, 2000));

    authUser = async (target, login, password) => {
      try {
        const { data: { status, message } } = await axios.post("/auth", { username: login, password });
        const res = await this.noop();
        this.setState({
          loginForm: target,
          errors: message,
          isLoaded: true,
        });
      } catch(error) {
        console.log(error)
      }
    };

    onCloseTooltip = () => {
      this.setState({
        isLoaded: false,
      });
    }
    render() {
      const { isLoaded, errors, loginForm } = this.state;
      return (
        <React.Fragment>
          <SimpleTooltip
            isOpenTooltip={isLoaded}
            target={loginForm}
            errors={errors}
            sendingForm={isLoaded}
          />
          <ComposedComponent {...this.props } authUser={this.authUser} closeTooltip={this.onCloseTooltip} />
        </React.Fragment>
      );
    }
  };

export default FormWrapper;
