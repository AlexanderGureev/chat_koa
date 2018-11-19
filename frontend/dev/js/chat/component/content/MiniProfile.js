import React, { Component } from "react";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import { withStyles } from "@material-ui/core/styles";
import cn from "classnames";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { Badge } from "antd";
import FormattedDate from "./FormattedDate";

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
  // onlineStatusTemplate = () => {
  //   const { offline_date, online_date } = this.props.user;
  //   const offlineDate = new Date(offline_date).getTime();
  //   const onlineDate = new Date(online_date).getTime();
  //   const isOnline = offlineDate < onlineDate;

  //   return (
  //     <div className="wrap-online-date">
  //     {!isOnline ? <span>Был в сети </span> : <Badge status="success" />  }
  //     {!isOnline ? <FormattedDate>{offlineDate}</FormattedDate> : <span> В сети</span>}
  //   </div>
  //   )
  // }

  render() {
    const {
      isOpen,
      target,
      user: { username, profile },
      classes,
      setRef,
      handleClose
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
          <ClickAwayListener
            touchEvent="onTouchStart"
            onClickAway={handleClose}
          >
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
                      {/* { this.onlineStatusTemplate() } */}
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
          </ClickAwayListener>
        )}
      </Popper>
    );
  }
}

export default withStyles(styles)(MiniProfile);
