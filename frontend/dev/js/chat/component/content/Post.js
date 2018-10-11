import React, { Component, Fragment } from "react";
import cn from "classnames";
import FormattedDate from "./FormattedDate";

const Post = ({ message, id, children}) => {
  const { user_id, author, date, status, avatarPath } = message;

  const classes = cn({
    post: true,
    "my-post": id === user_id
  });
  const classesAva = cn({
    avatar: id !== user_id,
    "my-avatar": id === user_id
  });
  const styles = {
    background: `url(${avatarPath}) center center`,
    backgroundSize: "cover"
  };

  return (
    <div className={classes}>
      <div className={classesAva} style={styles} />
      <div className="message">
        <div className="text">
         { children }
        </div>
        <div className="footer">
          <div className="author">{author}</div>
          <FormattedDate>{date}</FormattedDate>
        </div>
      </div>
    </div>
  );
};

export default Post;
