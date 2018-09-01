import React, { Component } from "react";
import cn from "classnames";

class UploadAvatarProfile extends Component {
  state = {
    path: "",
    isSend: false
  };

  handleChange = ({ target: { value } }) => {
    this.setState({
      path: value,
      isSend: !this.state.isSend
    });
  };
  submitForm = e => {
    e.preventDefault();
    console.log(this.state.path);
  };
  handleClear = e => {
    e.preventDefault();
  };
  handleDelete = e => {
    e.preventDefault();
  };

  render() {
    const { path, isSend } = this.state;
    const avaBox = cn({
      avatarBox: true,
      upd: !isSend,
      send: isSend
    });
    const style = {
      backgroundImage: "url('/img/ava_default.png')"
    };
    const btnStyles = {
      display: isSend ? "block" : "none"
    };

    return (
      <form
        action="/profile/upload"
        method="POST"
        encType="multipart/form-data"
        className="uploadAvatar"
        onSubmit={this.submitForm}
      >
        <input type="hidden" name="_csrf" value="" />

        <label htmlFor="avatar">
          <div className={avaBox} style={style} />
        </label>

        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={this.handleChange}
        />
        <span className="fileName">{path}</span>

        <button type="submit" className="btnSend" style={btnStyles}>
          <i className="fas fa-share-square" />
        </button>

        <a
          href="#"
          className="clear"
          style={btnStyles}
          onClick={this.handleClear}
        >
          <i className="fas fa-times" />
        </a>

        <a
          href="#"
          className="delete"
          style={btnStyles}
          onClick={this.handleDelete}
        >
          <i className="fas fa-times" />
        </a>

        <a href="#" className="delete show">
          <i className="fas fa-times" />
        </a>
      </form>
    );
  }
}

export default UploadAvatarProfile;
