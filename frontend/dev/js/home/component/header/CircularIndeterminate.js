import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 1
  }
});

function CircularIndeterminate(props) {
  const { classes, isActive } = props;
  const style = {
    position: "relative",
    width: 0,
    height: 0,
    top: -10 + "px",
    left: 41 + "%",
    display: isActive ? "block" : "none"
  };
  return (
    <div style={style}>
      <CircularProgress className={classes.progress} size={40} />
    </div>
  );
}

CircularIndeterminate.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CircularIndeterminate);
