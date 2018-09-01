import React, { Component } from "react";
import cn from "classnames";

class ChangeStatusProfile extends Component {
  constructor() {
    super();
    this.style = {
      display: "none"
    };
    this.statusMenu = React.createRef();
  }

  state = {
    isOpen: false
  };

  handleCloseMenu = e => {
    if (!this.statusMenu.current.contains(e.target)) {
      this.setState({
        isOpen: false
      });
    }
  };

  componentDidMount() {
    window.addEventListener("click", this.handleCloseMenu);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleCloseMenu);
  }
  
  handleAnimationEnd = () => {
    if (!this.state.isOpen) {
      this.style = { display: "none" };
      this.forceUpdate();
    }
  };

  handleClick = e => {
    e.preventDefault();
    const { display } = this.style;
    const { isOpen } = this.state;

    if (display === "none") {
      this.style = { display: "block" };
      return this.props.raf(() => {
        this.setState({
          isOpen: !isOpen
        });
      });
    }
    this.setState({
      isOpen: !isOpen
    });
  };

  submitForm = e => {
    e.preventDefault();
    console.log("OK!");
  };

  render() {
    const { isOpen } = this.state;
    const cnForm = cn({
      "form-change-status": true,
      "fa-active-status": isOpen,
      "fa-disabled-status": !isOpen
    });

    return (
      <div className="status" ref={this.statusMenu}>
        <a href="#" className="open-form" onClick={this.handleClick}>
          User Status
        </a>
        <div
          className={cnForm}
          style={this.style}
          onAnimationEnd={this.handleAnimationEnd}
        >
          <form
            action="/profile/status"
            method="POST"
            className="statusForm"
            onSubmit={this.submitForm}
          >
            <input type="hidden" name="_csrf" value="" />
            <input type="text" name="statusText" id="status" />
            <button type="submit" className="button-ex status">
              Сохранить
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default ChangeStatusProfile;
