import React from "react";
import cn from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
  root: {
    position: "absolute",
    display: "none"
  },
  disabled: {
    display: "block"
  }
};

const CircularIndeterminate = props => {
  const { classes, isActive } = props;
  const cnTooltip = cn(classes.root, { [classes.disabled]: isActive });

  return (
    <div className={cnTooltip}>
      <CircularProgress size={40} />
    </div>
  );
};

export default withStyles(styles)(CircularIndeterminate);
