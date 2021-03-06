import React, { Component } from "react";
import cn from "classnames";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class ProfileMenu extends Component {
  constructor() {
    super();
    this.list = React.createRef();
    this.toggle = React.createRef();
    this.styleList = {
      display: "none"
    };
  }
  state = {
    isOpen: false
  };

  handleCloseMenu = e => {
    if (
      !this.list.current.contains(e.target) &&
      !this.toggle.current.contains(e.target)
    ) {
      this.setState({
        isOpen: false
      });
    }
  };

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
      this.styleList = { display: "none" };
      this.forceUpdate();
    }
  };

  handleClick = e => {
    const { display } = this.styleList;
    const { isOpen } = this.state;

    if (display === "none") {
      this.styleList = { display: "block" };
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

  renderNav = () => {
    const { provider } = this.props;
    return (
      <ul>
        <li>
          <a href="#">Главное меню</a>
        </li>
        <li>
          <a href="#">Друзья</a>
        </li>
        {provider === "local" && (
          <li>
            <Link to="/changePassword">Смена пароля</Link>
          </li>
        )}
        <li>
          <a href="#">Подписка</a>
        </li>
        <li>
          <a href="#">Настройки</a>
        </li>
      </ul>
    );
  };

  render() {
    const { isOpen } = this.state;
    const cnList = cn({
      list: true,
      "fa-active-list": isOpen,
      "fa-disabled-list": !isOpen
    });

    return (
      <div className="menu">
        <div className="toggle" onClick={this.handleClick} ref={this.toggle}>
          <i className="fas fa-align-right" />
        </div>
        <div
          className={cnList}
          style={this.styleList}
          ref={this.list}
          onAnimationEnd={this.handleAnimationEnd}
        >
          {this.renderNav()}
        </div>
      </div>
    );
  }
}

export default ProfileMenu;
