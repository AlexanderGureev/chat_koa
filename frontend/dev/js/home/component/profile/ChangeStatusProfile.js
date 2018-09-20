import React, { Component } from "react";
import cn from "classnames";
import ButtonEx from "../header/ButtonEx";

class ChangeStatusProfile extends Component {
  constructor() {
    super();
    this.style = {
      display: "none"
    };
    this.statusMenu = React.createRef();
  }

  state = {
    currentStatus: "",
    statusText: "",
    isOpen: false
  };

  handleCloseMenu = e => {
    if (!this.statusMenu.current.contains(e.target)) {
      this.props.changeForm(); //закрыть все тултипы
      this.setState({
        isOpen: false
      });
    }
  };
  componentWillMount() {
    this.setState({
      status: this.props.status
    });
  }
  componentDidMount() {
    window.addEventListener("click", this.handleCloseMenu);
    window.addEventListener("touchstart", this.handleCloseMenu);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleCloseMenu);
    window.removeEventListener("touchstart", this.handleCloseMenu);
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
  handleChangeStatus = ({ target: { value } }) => {
    this.setState({
      statusText: value
    });
  };

  submitForm = async e => {
    e.preventDefault();
    const { statusText } = this.state;
    const { sendForm } = this.props;
    const status = await sendForm(e.target, {
      status: statusText
    });
    status && this.setState({
      status,
      statusText: "",
      isOpen: false
    });
  };

  render() {
    const { isOpen, statusText, status } = this.state;
    const { isLoading } = this.props;
    const style = {
      padding: "10px 20px",
      margin: 0,
      fontSize: "14px",
      background: "linear-gradient(135deg, #4D73CB, #195597)"
    };

    const cnForm = cn({
      "form-change-status": true,
      "fa-active-status": isOpen,
      "fa-disabled-status": !isOpen
    });

    return (
      <div className="status" ref={this.statusMenu}>
        <a href="#" className="open-form" onClick={this.handleClick}>
          {status}
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
            <input
              type="text"
              name="statusText"
              id="status"
              value={statusText}
              onChange={this.handleChangeStatus}
            />
            <ButtonEx isActive={isLoading} style={style} size={20}>
              Сохранить
            </ButtonEx>
          </form>
        </div>
      </div>
    );
  }
}

export default ChangeStatusProfile;
