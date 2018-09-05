const responseMessage = (status = 200, message = "OK", data) => ({
  status,
  message,
  data
});

exports.responseMessage = responseMessage;