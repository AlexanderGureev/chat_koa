import React, { Component } from "react";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";

const SimpleTooltip = props => {
  const renderTemplate = () => {
    const { isOpenTooltip, target, errors } = props;
    return (
      <Popper
        open={isOpenTooltip}
        anchorEl={target}
        className="error-tooltipster"
        placement="top"
        transition
        modifiers={{
          flip: { behavior: ["right", "left"] }
        }}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={450}>
            <Paper className="paper-error">
              <ul>
                {errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  };

  const { value, minLength = 0 } = props;
  return value ? value.length > minLength && renderTemplate() 
               : renderTemplate();
};
export default SimpleTooltip;
