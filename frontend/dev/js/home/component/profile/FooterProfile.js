import React, { Component } from "react";
import ButtonLink from "./ButtonLink";

const FooterProfile = props => {
  const handleClickLogout = e => {
    e.preventDefault();
    props.logout();
  };

  const handleClickToChat = e => {
    window.location.href=`${window.location.origin}/chat`;
  };

  return (
    <div className="footer">
      <ButtonLink onClick={handleClickToChat}>Join chat</ButtonLink>
      <ButtonLink onClick={handleClickLogout}>Log out</ButtonLink>
    </div>
  );
};

export default FooterProfile;
