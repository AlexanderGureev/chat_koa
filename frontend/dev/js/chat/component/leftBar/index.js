import React, { Component } from "react";
import BarFooter from "./BarFooter";
import Nav from "./Nav";
import Rooms from "./Rooms";
import cn from "classnames";

class LeftBar extends Component {
  constructor(props) {
    super(props);
    this.leftBar = React.createRef();
  }
  state = {
    isOpen: false
  };

  componentDidMount() {
    window.addEventListener("click", this.handleCloseMenu);
    window.addEventListener("touchend", this.handleCloseMenu);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handleCloseMenu);
    window.removeEventListener("touchend", this.handleCloseMenu);
  }

  getModalWindow = () =>
    document.querySelector("div.ant-modal") || { contains: () => {} };

  getPopover = () => document.querySelectorAll("div.ant-popover") || [];

  handleCloseMenu = ({ target }) => {
    if (
      !this.leftBar.current.contains(target) &&
      !this.getModalWindow().contains(target) &&
      ![].some.call(this.getPopover(), div => div.contains(target))
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
    const { rooms, createRoom, deleteRoom, changeRoom } = this.props;
    const classesBar = cn({
      "left-side-bar": true,
      active: isOpen
    });
    const classesToogle = cn({
      toggle: true,
      hide: isOpen
    });

    return (
      <div className={classesBar} ref={this.leftBar}>
        <span className={classesToogle} onClick={this.toggleMenu} />
        <div className="collapsed-bar" id="left-bar">
          <div className="closes" onClick={this.toggleMenu} />
          <Nav user={this.props.user} closeNav={this.toggleMenu}/>
          <Rooms
            rooms={rooms}
            createRoom={createRoom}
            deleteRoom={deleteRoom}
            changeRoom={changeRoom}
          />
        </div>
        <BarFooter />
      </div>
    );
  }
}

export default LeftBar;
