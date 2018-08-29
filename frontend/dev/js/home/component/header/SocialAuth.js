import React, { Component } from "react";

export default function SocialAuth(props) {
  return (
    <div className="socialAuth">
      <a href="/auth/vkontakte">
        <img src="/img/vk.svg" alt="" />
      </a>
      <a href="/auth/google/">
        <img src="/img/google-plus.svg" alt="" />
      </a>
      <a href="/auth/twitter">
        <img src="/img/twitter.svg" alt="" />
      </a>
      <h4>Вход через соц. сети</h4>
    </div>
  );
}
