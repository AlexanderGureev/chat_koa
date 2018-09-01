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
    return (
      <div className="header">
        <ProfileMenu raf={this.raf}/>
        <div className="about-me">
          <div className="name">User Name</div>
          <ChangeStatusProfile raf={this.raf}/>
          <UploadAvatarProfile />
        </div>
        <a className="button-ex profileBtn" href="#">
          Edit Profile
        </a>
      </div>
    );
  }
}

export default HeaderProfile;
