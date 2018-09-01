import React, { Component } from "react";

const FooterProfile = props => {
  return (
    <div className="footer">
      <a className="button-ex profileBtn" href="/chat">
        Join chat
      </a>
      <a className="button-ex profileBtn" href="/logout">
        Log out
      </a>
    </div>
  );
};

export default FooterProfile;
