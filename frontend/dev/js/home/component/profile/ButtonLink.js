import React, { Component } from "react";
import cn from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const styles = {
  root: {
    fontSize: "14px",
    color: "#F6F6FC",
    outline: "none",
    background: "linear-gradient(135deg, #4D73CB, #195597)",
    padding: "12.5px 16px",
    minWidth: "165px",
    cursor: "pointer",
    margin: 0,
    textAlign: "center",
    fontWeight: 600,
    borderRadius: 0,
    fontFamily: "Montserrat-ex,sans-serif",
    "&:hover": {
      color: "#F6F6FC"
    },
    "@media (max-width: 480px)": {
      minWidth: "135px",
      padding: "10px 16px"
    }
  }
};

const ButtonEx = props => {
  const { classes, children, onClick, style } = props;
  const cnBtn = cn(classes.root);
  return <Button className={cnBtn} style={style} onClick={onClick}>{children}</Button>;
};

export default withStyles(styles)(ButtonEx);
