import React, { Component, Fragment } from "react";
import UserProfile from "./UserProfile";

class Nav extends Component {
  state = { visible: false };

  showProfile = () => {
    this.props.closeNav();
    this.setState({
      visible: true
    });
  };

  onCloseProfile = () => {
    this.setState({
      visible: false
    });
  };
  changeAvatar = () => {};
  renderNav = () => (
    <nav>
      <ul>
        <li>
          <a href="#" onClick={this.showProfile}>
            Profile
          </a>
        </li>
        <li>
          <a href="#">Messages</a>
        </li>
        <li>
          <a href="#">Settings</a>
        </li>
      </ul>
    </nav>
  );

  render() {
    const { visible } = this.state;
    const { user } = this.props;
    return (
      <Fragment>
        <UserProfile
          user={user}
          visible={visible}
          onClose={this.onCloseProfile}
          changeAvatar={this.changeAvatar}
        />
        {this.renderNav()}
      </Fragment>
    );
  }
}

export default Nav;
