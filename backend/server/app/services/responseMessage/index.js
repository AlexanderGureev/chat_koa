const responseMessage = (status = 200, message = "OK") => ({
  status,
  message
});

module.exports.responseMessage = responseMessage;