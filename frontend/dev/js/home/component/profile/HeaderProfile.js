import React, { Component } from "react";
import ProfileMenu from "./ProfileMenu";
import UploadAvatarProfile from "./UploadAvatarProfile";
import ChangeStatusProfile from "./ChangeStatusProfile";
import ButtonLink from "./ButtonLink";
import FormWrapper from "../header/FormWrapper";

const WrappedChangeStatusProfile = FormWrapper(ChangeStatusProfile, {
  url: "/profile/status/change",
  method: "put"
});
const WrappedUploadAvatarProfile = FormWrapper(UploadAvatarProfile, {
  url: "/profile/add/avatar",
  method: "post"
});

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
          <WrappedChangeStatusProfile
            raf={this.raf}
            status={this.props.status}
          />
          <WrappedUploadAvatarProfile avatarPath={this.props.avatarPath} />
        </div>
        <ButtonLink onClick={this.handleClick} style={style}>
          Edit Profile
        </ButtonLink>
      </div>
    );
  }
}

export default HeaderProfile;
