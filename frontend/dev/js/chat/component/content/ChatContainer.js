import React, { Component } from "react";
import Posts from "./Posts";
import EmojiBox from "./EmojiBox";

class ChatContainer extends Component {
  state = {
    message: "",
    emojiIsOpen: false
  };

  componentDidMount() {
    window.addEventListener("click", this.onCloseEmojiBox);
    window.addEventListener("touchstart", this.onCloseEmojiBox);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.onCloseEmojiBox);
    window.removeEventListener("touchstart", this.onCloseEmojiBox);
  }
  onCloseEmojiBox = ({ target }) => {
    if (!this.emojiBoxRef.contains(target)) {
      this.setState({
        emojiIsOpen: false
      });
    }
  };
  removeSpaces = message => message.replace(/\s/g, "");
  submitForm = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  };
  onChangeInput = ({ target: { value } }) => {
    this.setState({
      message: value
    });
  };

  selectEmoji = ({ colons }) => {
    const { message } = this.state;
    this.setState({
      message: `${message}${colons}`
    });
  };
  openEmojiBox = e => {
    e.preventDefault();
    this.setState({
      emojiIsOpen: !this.state.emojiIsOpen
    });
  };
  setRef = el => (this.emojiBoxRef = el);
  render() {
    const { isLoaded } = this.props;
    const { message, emojiIsOpen } = this.state;
    const isDisabled = !Boolean(this.removeSpaces(message));

    return (
      <div className="chat-container">
        {isLoaded && <Posts {...this.props} />}
        <form action="" className="send-message" onSubmit={this.submitForm}>
          <input
            type="text"
            name="message"
            id="input-message"
            placeholder="Write something"
            autoComplete="off"
            value={message}
            onChange={this.onChangeInput}
          />
          <div className="wrap-link">
            <a href="#" className="link" />
          </div>
          <div className="btn-wrap">
            <button type="submit" disabled={isDisabled} className="send" />
          </div>
          <EmojiBox
            setRef={this.setRef}
            isOpen={emojiIsOpen}
            onSelect={this.selectEmoji}
            openEmojiBox={this.openEmojiBox}
          />
        </form>
      </div>
    );
  }
}

export default ChatContainer;
