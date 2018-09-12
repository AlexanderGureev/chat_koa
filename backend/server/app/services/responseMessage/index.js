const responseMessage = (status = 200, message, data) => ({
  status,
  message,
  data
});

exports.responseMessage = responseMessage;