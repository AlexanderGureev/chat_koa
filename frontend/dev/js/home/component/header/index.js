import React, { Component } from "react";
import TopLine from "./TopLine";
import HeaderCenter from "./HeaderCenter";
//import NoMatch from "./NoMatch";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { isAuth, authenticateUser, logout } from "../../services/Auth";

export default class Header extends Component {
  state = {
    isAuth: false
  };

  componentWillMount() {
    isAuth()
      .then(isAuth => {
        this.setState({
          isAuth
        });
      })
      .catch(err => console.log(err));
  }

  authenticateUser = async () => {
    const isAuth = await authenticateUser();
    this.setState({
      isAuth
    });
  };

  logout = async () => {
    const isAuth = await logout();
    this.setState({
      isAuth
    });
  };

  render() {
    const { isAuth } = this.state;
    return (
      <div id="my-page">
        <div id="my-header">
          <Router>
            <header className="site-header">
              <TopLine isAuth={isAuth} />
              <Route
                path="/"
                render={props => (
                  <HeaderCenter
                    {...props}
                    isAuth={isAuth}
                    authenticateUser={this.authenticateUser}
                    logout={this.logout}
                  />
                )}
              />
            </header>
          </Router>
        </div>
      </div>
    );
  }
}
