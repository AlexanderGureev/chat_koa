import React, { Component } from "react";
import cn from "classnames";
import { withStyles } from "@material-ui/core/styles";
import CircularIndeterminate from "./CircularIndeterminate";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    overflow: "hidden",
    position: "relative",
    outline: "none",
    cursor: "pointer",
    fontWeight: 600,
    textTransform: "uppercase",
    fontSize: "20px",
    padding: "10px 0",
    color: "#fff",
    background: "linear-gradient(135deg, #82A5F6, #2B6AAF)",
    filter: "drop-shadow(0 10px 25px rgba(0,0,0, .2))",
    borderRadius: "0",
    marginTop: "-15px"
  },
  disabled: {
    background: "rgba(0, 0, 0, 0.12)",
    color: "white",
    boxShadow: "none"
  }
};

const ButtonEx = props => {
  const { classes, isActive, children } = props;
  const cnBtn = cn(classes.root, { [classes.disabled]: isActive });

  return (
    <Button type="submit" disabled={isActive} className={cnBtn}>
      <CircularIndeterminate isActive={isActive} />
      { children }
    </Button>
  );
};

export default withStyles(styles)(ButtonEx);
