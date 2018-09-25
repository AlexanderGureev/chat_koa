import React, { Component } from "react";
import cn from "classnames";
import withCookies from "./withCookies";

const formatDate = date => {
  if (!date) {
    return;
  }

  let diff = new Date() - date;

  if (diff < 1000) {
    return "только что";
  }

  let sec = Math.floor(diff / 1000);

  if (sec < 60) {
    return sec + " сек. назад";
  }

  let min = Math.floor(diff / 60000);
  if (min < 60) {
    return min + " мин. назад";
  }

  let _date = new Date(date);
  let formattedDate = [
    "0" + _date.getDate(),
    "0" + (_date.getMonth() + 1),
    "" + _date.getFullYear(),
    "0" + _date.getHours(),
    "0" + _date.getMinutes()
  ].map(d => d.slice(-2));

  return (
    formattedDate.slice(0, 3).join(".") + " " + formattedDate.slice(3).join(":")
  );
};

const Post = ({ text, user_id, author, date, status, avatarPath, cookies }) => {
  const classes = cn({
    post: true,
    "my-post": cookies.id === user_id
  });

  const avaStyle = {
    position: "absolute",
    right: "-40px",
    top: "-40px",
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    filter: "drop-shadow(0 0 20px rgba(0, 0, 0, 0.3))",
    background: `url(${avatarPath}) center center`,
    backgroundSize: "cover"
  };

  return (
    <div className={classes}>
      <div className="my-avatar" style={avaStyle} />
      <div className="message">
        <div className="text">{text}</div>
        <div className="footer">
          <div className="author">{author}</div>
          <div className="date">{formatDate(date)}</div>
        </div>
      </div>
    </div>
  );
};

export default withCookies(Post, "id");
