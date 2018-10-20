import React, { Component } from "react";
import User from "./User";
import MiniProfile from "./MiniProfile";

class RightBar extends Component {
  constructor(props) {
    super(props);
    this.listUsers = React.createRef();
  }
  state = {
    isOpen: false,
    idOpenProfile: "",
    target: null
  };

  componentDidMount() {
    this.miniProfile = null;
    window.addEventListener("click", this.handlerCloseProfile);
    window.addEventListener("touchstart", this.handlerCloseProfile);
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.handlerCloseProfile);
    window.removeEventListener("touchstart", this.handlerCloseProfile);
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
    this.setState({
      isOpen: true,
      idOpenProfile: _id,
      target: e.currentTarget
    });
  };

  setRef = el => (this.miniProfile = el);

  render() {
    const { users } = this.props;
    console.log(users)
    const { isOpen, idOpenProfile, target } = this.state;
    const user = idOpenProfile
          ? users.find(({ _id }) => _id === idOpenProfile)
          : null;

    return (
      <React.Fragment>
        {user && (
          <MiniProfile
            setRef={this.setRef}
            isOpen={isOpen}
            user={user}
            target={target}
          />
        )}
        <div className="right-side-bar">
          <h3>
            Online -<span className="online-count"> {users.length} </span>
          </h3>
          <ul className="userOnline" ref={this.listUsers}>
            {users.map(user => (
              <User
                key={user._id}
                handlerOpenProfile={this.handlerOpenProfile(user._id)}
                {...user}
              />
            ))}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

export default RightBar;
