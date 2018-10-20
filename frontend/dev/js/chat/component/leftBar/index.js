import React, { Component } from "react";
import BarFooter from "./BarFooter";
import Nav from "./Nav";
import Rooms from "./Rooms";
import cn from "classnames";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

class LeftBar extends Component {
  constructor(props) {
    super(props);
    this.leftBar = React.createRef();
  }
  state = {
    isOpen: false
  };

  getModalWindow = () =>
    document.querySelector("div.ant-modal") || { contains: () => {} };

  getPopover = () => document.querySelectorAll("div.ant-popover") || [];

  getDomElements = name => document.querySelectorAll(name) || [];

  handleCloseMenu = ({ target }) => {
    const fn = div => div.contains(target);
    if (
      !this.leftBar.current.contains(target) &&
      ![].some.call(this.getDomElements("div.ant-popover"), fn) &&
      ![].some.call(this.getDomElements("div.ant-modal"), fn)
    ) {
      this.setState({
        isOpen: false
      });
    }
  };

  toggleMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isOpen } = this.state;
    const { rooms, createRoom, deleteRoom, changeRoom, user } = this.props;
    const classesBar = cn({
      "left-side-bar": true,
      active: isOpen
    });
    const classesToogle = cn({
      toggle: true,
      hide: isOpen
    });

    return (
      <ClickAwayListener
        touchEvent="onTouchStart"
        onClickAway={this.handleCloseMenu}
      >
        <div className={classesBar} ref={this.leftBar}>
          <span className={classesToogle} onClick={this.toggleMenu} />
          <div className="collapsed-bar" id="left-bar">
            <div className="closes" onClick={this.toggleMenu} />
            <Nav user={user} closeNav={this.toggleMenu} />
            <Rooms
              rooms={rooms}
              active_room={user.active_room}
              createRoom={createRoom}
              deleteRoom={deleteRoom}
              changeRoom={changeRoom}
            />
          </div>
          <BarFooter />
        </div>
      </ClickAwayListener>
    );
  }
}

export default LeftBar;
