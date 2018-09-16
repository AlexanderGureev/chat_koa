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
  state = {
    email: "",
    avatarPath: "",
    status: "Сменить статус",
    isLoading: false,
    isLoaded: false
  };

  componentWillMount() {
    this.setState({ isLoading: true });
    getUser()
      .then(({ email, avatarPath, status, username }) => {
        this.setState({
          email,
          avatarPath,
          status,
          username,
          isLoading: false,
          isLoaded: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  renderTemplate = () => {
    const { logout } = this.props;
    return (
      <div className="profile">
        <HeaderProfile {...this.state} />
        <div className="body">
          <div className="left-column">
            <Posts posts={posts} />
          </div>
          <div className="right-column">
            <ContactInfo email={this.state.email} />
            <Friends friends={friends} />
          </div>
        </div>
        <FooterProfile logout={logout} />
      </div>
    );
  };

  render() {
    const { isAuth } = this.props;
    const { isLoading } = this.state;

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
            <LoadingCycle isActive={isLoading} size={80}/>
          </div>
        ) : (
          this.renderTemplate()
        )}
      </div>
    );
  }
}

export default UserProfile;
