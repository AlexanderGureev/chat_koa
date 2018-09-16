import React, { Component } from "react";
import ProfileMenu from "./ProfileMenu";
import UploadAvatarProfile from "./UploadAvatarProfile";
import ChangeStatusProfile from "./ChangeStatusProfile";

class HeaderProfile extends Component {
  raf = fn => {
    window.requestAnimationFrame(function() {
      fn();
    });
  };

  render() {
    const { username } = this.props;
    return (
      <div className="header">
        <ProfileMenu raf={this.raf}/>
        <div className="about-me">
          <div className="name">{ username }</div>
          <ChangeStatusProfile raf={this.raf} status={this.props.status}/>
          <UploadAvatarProfile avatarPath={this.props.avatarPath}/>
        </div>
        <a className="button-ex profileBtn" href="#">
          Edit Profile
        </a>
      </div>
    );
  }
}

export default HeaderProfile;
