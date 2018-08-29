import React, { Component } from "react";
import Popper from "@material-ui/core/Popper";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";

class SimpleTooltip extends Component {
  componentDidMount() {
    setTimeout(this.props.onClose, 10000);
  }

  renderTemplate = () => {
    const { isOpenTooltip, target, errors } = this.props;
    return (
      <Popper
        open={isOpenTooltip}
        anchorEl={target}
        className="error-tooltipster"
        placement="top"
        transition
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps} timeout={450}>
            <Paper>
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

  render() {
    const { value, sendingForm } = this.props;
    return sendingForm
      ? this.renderTemplate()
      : value.length > 3 && this.renderTemplate();
  }
}
export default SimpleTooltip;
