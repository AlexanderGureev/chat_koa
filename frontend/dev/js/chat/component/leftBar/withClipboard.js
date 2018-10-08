import React, { Component } from "react";

const withClipboard = WrappedComponent =>
  class WithClipboard extends Component {
    state = {
      value: "",
      copied: false
    };

    onCopyTimeout = () => {
      setTimeout(() => {
        this.setState({
          copied: false
        });
      }, 2000);
    };

    onCopy = () => {
      this.setState({ copied: true }, this.onCopyTimeout);
    };

    render() {
      const { value, copied } = this.state;
      return (
        <WrappedComponent
          {...this.props}
          inputValue={value}
          isCopied={copied}
          onCopy={this.onCopy}
        />
      );
    }
  };

export default withClipboard;
