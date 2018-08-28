import React, { Component } from "react";
import classnames from "classnames";
import RightBox from "./RightBox";
import Logo from "./Logo";
import Nav from "./Nav";
import ToggleMenu from "./ToggleMenu";
import MiniLogo from "./MiniLogo";

export default class TopLine extends Component {
  state = {
    isActive: false,
    isCollapsed: false
  };

  raf = fn => {
    window.requestAnimationFrame(function() {
      fn();
    });
  };

  activateMenu = () => {
    this.setState({
      isActive: !this.state.isActive
    });

    this.raf(() =>
      this.setState({
        isCollapsed: !this.state.isCollapsed
      })
    );
  };

  render() {
    let { isActive, isCollapsed } = this.state;
    let cnTopLine = classnames({
      "top-line": true,
      show: isActive
    });
    let cnCollapsed = classnames({
      collapsed: true,
      show: isActive,
      enter: isCollapsed
    });
    return (
      <div className={cnTopLine}>
        <ToggleMenu onClick={this.activateMenu} isFocus={isActive} />

        <MiniLogo isHide={isActive} />

        <div className={cnCollapsed}>
          <Logo />
          <Nav />
          <RightBox />
        </div>
      </div>
    );
  }
}
