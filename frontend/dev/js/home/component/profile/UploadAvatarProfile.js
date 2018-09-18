import React, { Component } from "react";
import cn from "classnames";
import LoadingCycle from "../header/CircularIndeterminate";

class UploadAvatarProfile extends Component {
  constructor(props) {
    super(props);
    this.avaInput = React.createRef();
    this.defaultAvatarPath = "img/ava_default.png";
  }
  state = {
    fileName: "",
    avatarPath: "",
    isSend: false
  };
  getForm = () => document.querySelector("div.manage-panel");
  handleChange = ({ target: { files } }) => {
    files.length !== 0 &&
      this.setState({
        fileName: files[0].name,
        isSend: true
      });
  };
  componentWillMount() {
    this.setState({
      avatarPath: this.props.avatarPath
    });
  }
  submitForm = async e => {
    e.preventDefault();
    const { sendForm } = this.props;
    const [file] = this.avaInput.current.files;
    const formData = new FormData();
    formData.append("avatar", file);

    const newAvatarPath = await sendForm(this.getForm(), formData, true);

    this.setState({
      fileName: "",
      avatarPath: newAvatarPath || this.defaultAvatarPath,
      isSend: false
    });
  };
  handleClear = e => {
    e.preventDefault();
    this.avaInput.current.value = null;
    this.setState({
      fileName: "",
      isSend: false
    });
  };
  handleDelete = async e => {
    e.preventDefault();
    const { sendForm } = this.props;
    const newAvatarPath = await sendForm(this.getForm(), {}, false, {
      method: "delete",
      url: "/profile/delete/avatar"
    });

    this.setState({
      fileName: "",
      avatarPath: newAvatarPath || this.defaultAvatarPath,
      isSend: false
    });
  };

  renderLoading = () => (
    <div className="loadingBox">
      <LoadingCycle isActive={this.props.isLoading} size={35} />
    </div>
  );
  render() {
    const { avatarPath, fileName, isSend } = this.state;
    const { isLoading } = this.props;
    const avaBox = cn({
      avatarBox: true,
      upd: !isSend,
      send: isSend
    });
    const style = {
      backgroundImage: `url("${avatarPath}")`
    };
    const btnStyles = {
      display: isSend ? "block" : "none"
    };
    const deleteBtn = cn({
      delete: true,
      show: avatarPath !== this.defaultAvatarPath && !isSend,
      hide: avatarPath === this.defaultAvatarPath || isSend
    });
    return isLoading ? (
      this.renderLoading()
    ) : (
      <form
        action="/profile/upload"
        method="POST"
        encType="multipart/form-data"
        className="uploadAvatar"
        onSubmit={this.submitForm}
      >
        <label htmlFor="avatar">
          <div className={avaBox} style={style} />
        </label>

        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={this.handleChange}
          onAbort={this.handleChange}
          ref={this.avaInput}
        />
        <span className="fileName">{fileName}</span>

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

        <a href="#" className={deleteBtn} onClick={this.handleDelete}>
          <i className="fas fa-times" />
        </a>
      </form>
    );
  }
}

export default UploadAvatarProfile;
