import React, { Component } from "react";
import AuthBtn from "./AuthBtn";
import SocialBox from "./SocialBox";

export default function RightBox({isAuth, closeMenu}) {
  return (
    <div className="right-box">
      <SocialBox />
      <AuthBtn isAuth={isAuth} closeMenu={closeMenu}/>
    </div>
  );
}
