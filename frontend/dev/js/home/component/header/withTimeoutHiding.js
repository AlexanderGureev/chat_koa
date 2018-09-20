import React, { Component } from "react";

const withTimeoutHiding = (ComposedComponent, timeOut) =>
  class extends Component {
    shouldComponentUpdate({ isOpenTooltip, closeTooltip }) {
      clearTimeout(this.timer);
      if (isOpenTooltip) {
        this.timer = setTimeout(() => {
          closeTooltip();
        }, timeOut);
      }
      return true;
    }

    componentWillUnmount() {
      clearTimeout(this.timer);
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  };

export default withTimeoutHiding;
