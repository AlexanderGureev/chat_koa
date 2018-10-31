import React, { Component, Fragment } from "react";
import User from "./User";
import MiniProfile from "./MiniProfile";

class RightBar extends Component {
  constructor(props) {
    super(props);
    this.listUsers = React.createRef();
  }
  state = {
    isOpen: false,
    user: "",
    target: null
  };

  componentWillReceiveProps(nextProps) {
    const { users } = nextProps;
    const { user, isOpen } = this.state;

    if (!isOpen) {
      return;
    }
    const res = users.find(({ _id }) => _id === user._id);
    if (!res) {
      this.setState({
        isOpen: false,
        user: "",
        target: null
      });
    }
  }
  handlerCloseProfile = ({ target }) => {
    if (
      this.miniProfile &&
      !this.listUsers.current.contains(target) &&
      !this.miniProfile.contains(target)
    ) {
      this.setState({ isOpen: false });
    }
  };
  handlerOpenProfile = _id => e => {
    e.preventDefault();
    const user = this.props.users.find(user => user._id === _id);
    if (!user) {
      return;
    }
    this.setState({
      isOpen: true,
      user: { ...user },
      target: e.currentTarget
    });
  };
  setRef = el => (this.miniProfile = el);
  render() {
    const { users, queueTypingText } = this.props;
    const { isOpen, user, target } = this.state;

    return (
      <Fragment>
        {user && (
          <MiniProfile
            setRef={this.setRef}
            isOpen={isOpen}
            user={user}
            target={target}
            handleClose={this.handlerCloseProfile}
          />
        )}

        <div className="right-side-bar">
          <h3>
            В сети -<span className="online-count"> {users.length} </span>
          </h3>
          <ul className="userOnline" ref={this.listUsers}>
            {users.map(user => (
              <User
                key={user._id}
                handlerOpenProfile={this.handlerOpenProfile(user._id)}
                {...user}
                isTyping={queueTypingText.some(({ _id }) => _id === user._id)}
              />
            ))}
          </ul>
        </div>
      </Fragment>
    );
  }
}

export default RightBar;
