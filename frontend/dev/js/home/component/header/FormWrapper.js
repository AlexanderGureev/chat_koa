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

const { NODE_ENV = "development" } = process.env;

const FormWrapper = (
  ComposedComponent,
  { url, method = "post", redirectURL }
) =>
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

    sendForm = async (target, data, formData = false, options) => {
      this.setState({ isLoading: true });
      const { authenticateUser, match } = this.props;

      if (match && match.params.token) {
        url = match.url;
      }

      try {
        const token = await getToken("/api/token");
        const _options = formData
          ? {
              method,
              url,
              data,
              headers: { "X-CSRF-Token": `${token}` }
            }
          : {
              method,
              url,
              data: {
                ...data,
                _csrf: token
              },
              ...options
            };

        const {
          data: { status, message, errors, info }
        } = await axios(_options);

        NODE_ENV === "development" && await this.noop(); //временно

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
        } else {
          this.setState({
            target,
            isLoading: false,
            isLoaded: true
          });
        }

        if (authenticateUser) {
          await authenticateUser();
        }

        if (info) {
          return info;
        }
      } catch ({ message }) {
        const errors = message instanceof Array ? message : [message];
        this.setState({
          target,
          errors,
          isLoading: false,
          isLoaded: true,
          isOpenTooltip: true
        });
      }
    };

    wrappedChangeForm = (fn = () => {}) => e => {
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
