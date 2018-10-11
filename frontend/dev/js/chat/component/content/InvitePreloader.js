import ContentLoader from "react-content-loader";
import React, { Component, Fragment } from "react";

const InvitePreloader = props => (
  <div className="invite-preloader">
    <ContentLoader
      height={100}
      width={350}
      speed={2}
      primaryColor="#f3f3f3"
      secondaryColor="#aebada"
      {...props}
    >
      <rect x="88" y="42.18" rx="4" ry="4" width="146.25" height="9" />
      <rect x="88" y="63.4" rx="3" ry="3" width="114.75" height="9" />
      <rect x="88" y="19.66" rx="3" ry="3" width="254.8" height="9" />
      <circle cx="45.56" cy="48.56" r="34.56" />
    </ContentLoader>
  </div>
);

export default InvitePreloader;
