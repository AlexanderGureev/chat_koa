import React, { Component } from "react";
import { getUser } from "../../services/api";
import SimpleTooltip from "../header/SimpleTooltip";
import withDelay from "../header/withDelay";

const SimpleTooltipWithDelay = withDelay(SimpleTooltip, 2000);

const ProfileWrapper = ComposedComponent =>
  class extends Component {
    state = {
      email: "",
      avatarPath: "",
      status: "Сменить статус",
      isLoading: false,
      isLoaded: false,
      errors: [],
      isFail: false
    };

    async componentWillMount() {
      this.setState({ isLoading: true });
      try {
        const userProfile = await getUser();
        this.setState({
          ...userProfile,
          isLoading: false,
          isLoaded: true,
          isFail: false
        });
      } catch (error) {
        this.setState({
          isLoading: false,
          isLoaded: true,
          errors: [error.message],
          isFail: true
        });
      }
    }
    getForm = () => document.querySelector("div.manage-panel");

    render() {
      const { isFail, errors } = this.state;
      return (
        <React.Fragment>
          <SimpleTooltipWithDelay
            isOpenTooltip={isFail}
            target={this.getForm()}
            errors={errors}
          />
          <ComposedComponent {...this.props} {...this.state} />
        </React.Fragment>
      );
    }
  };

  export default ProfileWrapper;