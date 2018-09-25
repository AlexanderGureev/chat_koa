import React, { Component } from "react";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import { withStyles } from "@material-ui/core/styles";
import cn from "classnames";

const styles = {
  root: {
    zIndex: 100,
    display: "flex"
  }
};
const StyledPaper = withStyles({
  root: {
    backgroundColor: "#5277CA",
    boxShadow: "0 0 30px rgba(0,0,0, .3)",
    borderRadius: 0
  }
})(Paper);

class MiniProfile extends Component {
  componentWillUnmount() {
    this.setRef && this.setRef(null);
  }

  render() {
    const {
      isOpen,
      target,
      user: { username, profile },
      classes,
      setRef
    } = this.props;

    const cnTooltip = cn(classes.root);

    return (
      <Popper
        ref={setRef}
        open={isOpen}
        anchorEl={target}
        className={cnTooltip}
        placement="left-start"
        transition
        modifiers={{
          flip: { behavior: ["right", "left"] }
        }}
      >
        {({ TransitionProps }) => (
          <div ref={setRef}>
            <Grow {...TransitionProps} timeout={250}>
              <StyledPaper
                className="tooltipster-profile-customized"
                square={false}
              >
                <div className="tooltipster-content">
                  <div className="header">
                    <img src={profile.avatarPath} alt="avatar" />
                    <strong>{username}</strong>
                  </div>
                  <div className="content">
                    <ul>
                      <li>
                        <a href="#">Настройки</a>
                      </li>
                      <li>
                        <a href="#">Друзья</a>
                      </li>
                      <li>
                        <a href="#">Личные сообщения</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </StyledPaper>
            </Grow>
          </div>
        )}
      </Popper>
    );
  }
}

export default withStyles(styles)(MiniProfile);
