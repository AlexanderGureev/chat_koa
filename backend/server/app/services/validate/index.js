const validateResetPasswordForm = ({passNew, passConfirm}) => {
  if(passNew !== "" && passConfirm !== "") {
    return passNew === passConfirm;
  }
  return false;
}

module.exports = {
  validateResetPasswordForm
}