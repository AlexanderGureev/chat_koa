import React, { Component } from "react";

const withDelay = (ComposedComponent, delay) =>
  class extends Component {
    state = {
      hidden: false
    };

    componentDidMount() {
      this.timer = setTimeout(() => {
        this.setState({ hidden: true });
      }, delay);
    }
    componentWillUnmount() {
      clearTimeout(this.timer);
    }
    
    render() {
      const { hidden } = this.state;
      return hidden && <ComposedComponent {...this.props} />;
    }
  };

export default withDelay;
