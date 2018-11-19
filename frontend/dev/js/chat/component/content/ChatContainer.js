import React, { Component } from "react";
import Posts from "./Posts";
import EmojiBox from "./EmojiBox";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import UploadImg from "./UploadImg";

class ChatContainer extends Component {
  constructor(props) {
    super(props);
    this.timer;
    this.defaultInterval = 3000;
    this.isTyping = false;
    this.currentRoom;
  }
  state = {
    message: "",
    emojiIsOpen: false
  };

  findCurrentRoom() {
    const { active_room, rooms = [] } = this.props.user;
    if (!this.props.isLoaded) {
      return { name: "..." };
    }
    
    this.currentRoom = rooms.find(({ _id }) => _id === active_room);
    return this.currentRoom;
  }
  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }
  componentWillReceiveProps(props) {
    const { active_room } = props.user;
    if (!this.currentRoom) {
      return;
    }
    const { _id } = this.currentRoom;
    if (active_room !== _id) {
      this.setState({ message: "" });
    }
  }
  onCloseEmojiBox = ({ target }) => {
    if (!this.emojiBoxRef.contains(target)) {
      this.setState({
        emojiIsOpen: false
      });
    }
  };
  submitForm = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  };
  setTyping = () => {
    const { setTypingIndicator, clearTypingIndicator } = this.props;
    const { defaultInterval } = this;
    if (this.timer) {
      clearTimeout(this.timer);
    }
    if (!this.isTyping) {
      setTypingIndicator();
      this.isTyping = true;
    }
    this.timer = setTimeout(() => {
      this.timer = undefined;
      this.isTyping = false;
      clearTypingIndicator();
    }, defaultInterval);
  };
  onChangeInput = ({ target: { value } }) => {
    this.setTyping();
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
    const { isLoaded, sendMessage } = this.props;
    const { message, emojiIsOpen } = this.state;
    const isDisabled = !Boolean(message.trim().length);
    const { name, unread_messages } = this.findCurrentRoom();

    return (
      <div className="chat-container">
        {isLoaded && <Posts {...this.props} unReadMessages={unread_messages} />}
        <form action="" className="send-message" onSubmit={this.submitForm}>
          <input
            type="text"
            name="message"
            id="input-message"
            placeholder={`Написать в #${name}`}
            autoComplete="off"
            value={message}
            onChange={this.onChangeInput}
          />
          <UploadImg sendMessage={sendMessage}/>
          <div className="btn-wrap">
            <button type="submit" disabled={isDisabled} className="send" />
          </div>
          <ClickAwayListener
            touchEvent="onTouchStart"
            onClickAway={this.onCloseEmojiBox}
          >
            <EmojiBox
              setRef={this.setRef}
              isOpen={emojiIsOpen}
              onSelect={this.selectEmoji}
              openEmojiBox={this.openEmojiBox}
            />
          </ClickAwayListener>
        </form>
      </div>
    );
  }
}

export default ChatContainer;
