import React, { Component } from "react";
import AuthBtn from "./AuthBtn";
import SocialBox from "./SocialBox";

export default function RightBox({isAuth}) {
  return (
    <div className="right-box">
      <SocialBox />
      <AuthBtn isAuth={isAuth}/>
    </div>
  );
}
