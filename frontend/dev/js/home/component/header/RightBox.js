import React, { Component } from "react";
import AuthBtn from "./AuthBtn";
import SocialBox from "./SocialBox";

export default function RightBox() {
  return (
    <div className="right-box">
      <SocialBox />
      <AuthBtn />
    </div>
  );
}
