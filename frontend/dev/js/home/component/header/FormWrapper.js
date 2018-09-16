import React, { Component } from "react";
import classnames from "classnames";
import SimpleTooltip from "./SimpleTooltip";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import axios from "axios";
import ValidationError from "../../services/validationError";
import getToken from "../../services/csrfToken";

const FormWrapper = (ComposedComponent, url, redirectURL) =>
  class extends Component {
    state = {
      target: null,
      errors: [],
      message: "",
      isLoading: false,
      isLoaded: false,
      isOpenTooltip: false
    };

    noop = async () =>
      new Promise((res, rej) =>
        setTimeout(() => {
          res(2);
        }, 2000)
      );

    sendForm = async (target, data) => {
      const { authenticateUser, match } = this.props;

      if (match && match.params.token) {
        url = match.url;
      }
    
      this.setState({ isLoading: true });

      try {
        const token = await getToken("/api/token");

        const {
          data: { status, message, errors }
        } = await axios.post(url, { ...data, _csrf: token });
        const res = await this.noop();

        if (status !== 200) {
          throw new ValidationError(errors);
        }
        if (message) {
          this.setState({
            target,
            isLoading: false,
            isLoaded: true,
            isOpenTooltip: true,
            message
          });
        }

        if (authenticateUser) {
          await authenticateUser();
        }
      } catch ({ message }) {
        this.setState({
          target,
          errors: message,
          isLoading: false,
          isLoaded: true,
          isOpenTooltip: true
        });
      }
    };

    wrappedChangeForm = fn => e => {
      this.setState({
        isOpenTooltip: false
      });
      fn(e);
    };

    render() {
      const { isLoading, errors, target, isOpenTooltip, message } = this.state;
      const { isAuth } = this.props;

      if (isAuth && redirectURL) {
        return <Redirect to={redirectURL} />;
      }

      return (
        <React.Fragment>
          <SimpleTooltip
            isOpenTooltip={isOpenTooltip}
            target={target}
            errors={errors}
            message={message}
          />
          <ComposedComponent
            {...this.props}
            changeForm={this.wrappedChangeForm(this.props.changeForm)}
            sendForm={this.sendForm}
            isLoading={isLoading}
          />
        </React.Fragment>
      );
    }
  };

export default FormWrapper;
