import React, { Component } from "react";
import Posts from "./Posts";
import Friends from "./Friends";
import ContactInfo from "./ContactInfo";
import FooterProfile from "./FooterProfile";
import HeaderProfile from "./HeaderProfile";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { getUser } from "../../services/api";
import LoadingCycle from "../header/CircularIndeterminate";

const posts = [
  {
    text: "Lorem ipsum dolor sit eiusmod amet...",
    date: "10:25 PM"
  },
  {
    text: "Lorem ipsum dolor sit eiusmod amet...",
    date: "10:35 PM"
  },
  {
    text: "Lorem ipsum dolor sit eiusmod amet...",
    date: "10:45 PM"
  }
];
const friends = [
  { avatarUrl: "/img/ava2.png" },
  { avatarUrl: "/img/ava2.png" },
  { avatarUrl: "/img/ava2.png" },
  { avatarUrl: "/img/ava2.png" }
];

class UserProfile extends Component {
  renderTemplate = () => {
    const { logout, email } = this.props;
    return (
      <div className="profile">
        <HeaderProfile {...this.props} />
        <div className="body">
          <div className="left-column">
            <Posts posts={posts} />
          </div>
          <div className="right-column">
            <ContactInfo email={email} />
            <Friends friends={friends} />
          </div>
        </div>
        <FooterProfile logout={logout} />
      </div>
    );
  };

  renderErorrs = () => (
    <div className="loadingCycleBox">
      <img src="img/fail.svg" width="60px" alt="errors" />
    </div>
  );
  
  render() {
    const { isAuth, isLoading, isFail } = this.props;

    if (!isAuth) {
      return <Redirect to="/" />;
    }

    return (
      <div className="manage-panel">
        <span
          className="tooltipError"
          data-tooltip-content="#tooltip_content"
        />
        <div className="tooltip_templates">
          <span id="tooltip_content" />
        </div>

        {isLoading ? (
          <div className="loadingCycleBox">
            <LoadingCycle isActive={isLoading} size={80} />
          </div>
        ) : isFail ? (
          this.renderErorrs()
        ) : (
          this.renderTemplate()
        )}
      </div>
    );
  }
}

export default UserProfile;
