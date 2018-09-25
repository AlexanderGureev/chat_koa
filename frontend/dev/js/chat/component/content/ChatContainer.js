import React, { Component } from "react";
import Posts from "./Posts";

class ChatContainer extends Component {
  state = {
    message: ""
  };

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

  render() {
    const { message } = this.state;
    return (
      <div className="chat-container">
        <Posts {...this.props} />

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
          <a href="#" className="link" />
          <button type="submit" className="send" />
          <a href="#" className="smile" />
        </form>
      </div>
    );
  }
}

export default ChatContainer;
