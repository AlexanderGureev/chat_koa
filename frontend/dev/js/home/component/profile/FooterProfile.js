import React, { Component } from "react";

const FooterProfile = props => {

  const handleClick = e => {
    e.preventDefault();
    props.logout();
  }

  return (
    <div className="footer">
      <a className="button-ex profileBtn" href="/chat">
        Join chat
      </a>
      <a className="button-ex profileBtn" href="/logout" onClick={handleClick}>
        Log out
      </a>
    </div>
  );
};

export default FooterProfile;
