import React, { Component } from "react";
import Cookies from "js-cookie";
import SimpleTooltip from "./SimpleTooltip";
import withDelay from "./withDelay";

const SimpleTooltipWithDelay = withDelay(SimpleTooltip, 3000);

const withErrors = ComposedComponent =>
  class extends Component {
    state = {
      errors: [],
      isOpenTooltip: false
    };

    deleteCookie = () => Cookies.remove("errors");
    getForm = () => document.querySelector("form.register");
    componentWillMount() {
      const errors = Cookies.get("errors");
      if (errors) {
        this.setState(
          {
            errors: [...JSON.parse(errors)],
            isOpenTooltip: !this.state.isOpenTooltip
          },
          this.deleteCookie
        );
      }
    }

    wrappedChangeForm = fn => e => {
      this.setState({
        isOpenTooltip: false
      });
      fn(e);
    };

    render() {
      const { errors, isOpenTooltip } = this.state;
      const { changeForm } = this.props;
      return (
        <React.Fragment>
          <SimpleTooltipWithDelay
            isOpenTooltip={isOpenTooltip}
            target={this.getForm()}
            errors={errors}
          />
          <ComposedComponent
            {...this.props}
            changeForm={this.wrappedChangeForm(changeForm)}
          />
        </React.Fragment>
      );
    }
  };

export default withErrors;
