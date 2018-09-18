const responseMessage = (status = 200, message, info) => ({
  status,
  message,
  info
});

exports.responseMessage = responseMessage;