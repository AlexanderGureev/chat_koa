import React, { Component } from "react";
import ProfileMenu from "./ProfileMenu";
import UploadAvatarProfile from "./UploadAvatarProfile";
import ChangeStatusProfile from "./ChangeStatusProfile";
import ButtonLink from "./ButtonLink";

class HeaderProfile extends Component {
  raf = fn => {
    window.requestAnimationFrame(function() {
      fn();
    });
  };

  handleClick = e => {
    e.preventDefault();
    console.log("edit profile");
  };

  render() {
    const { username } = this.props;
    const style = { position: "absolute", right: "25px", bottom: 0 };
    return (
      <div className="header">
        <ProfileMenu raf={this.raf} />
        <div className="about-me">
          <div className="name">{username}</div>
          <ChangeStatusProfile raf={this.raf} status={this.props.status} />
          <UploadAvatarProfile avatarPath={this.props.avatarPath} />
        </div>
        <ButtonLink onClick={this.handleClick} style={style}>
          Edit Profile
        </ButtonLink>
      </div>
    );
  }
}

export default HeaderProfile;
