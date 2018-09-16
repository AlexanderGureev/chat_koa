import React, { Component } from "react";

const withDelay = (ComposedComponent, delay) =>
  class extends Component {
    state = {
      hidden: false
    };

    componentDidMount() {
      setTimeout(() => {
        this.setState({ hidden: true });
      }, delay);
    }

    render() {
      const { hidden } = this.state;
      return hidden && <ComposedComponent {...this.props}/>;
    }
  };

export default withDelay;
