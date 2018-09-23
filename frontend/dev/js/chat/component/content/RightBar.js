import React, { Component } from "react";
import User from "./User";

class RightBar extends Component {
  
  handlerOpenProfile = _id => e => {
    console.log(_id);
    e.preventDefault();
  }

  render() {
    const { users } = this.props;
    return (
      <div className="right-side-bar">
        <h3>
          Online -<span className="online-count"> {users.length} </span>
        </h3>
        <ul className="userOnline">
          {users.map(user => (
            <User key={user._id} handlerOpenProfile={this.handlerOpenProfile(user._id)} {...user} />
          ))}
        </ul>
      </div>
    );
  }
  
};

export default RightBar;
