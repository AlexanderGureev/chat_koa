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

const FormWrapper = (ComposedComponent, url) =>
  class extends Component {
    state = {
      target: null,
      errors: [],
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
      this.setState({ isLoading: true });
      try {
        const token = await getToken("/api/token");
        const {
          data: { status, message }
        } = await axios.post(url, { ...data, _csrf: token });

        const res = await this.noop();

        if (status !== 200) {
          throw new ValidationError(message);
        }
       
        this.setState({
          isLoading: false,
          isLoaded: true,
        });

        await this.props.authenticateUser();

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
      const { isLoading, errors, target, isOpenTooltip } = this.state;
      if (this.props.isAuth) {
        return <Redirect to="/profile" />;
      }

      return (
        <React.Fragment>
          <SimpleTooltip
            isOpenTooltip={isOpenTooltip}
            target={target}
            errors={errors}
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
