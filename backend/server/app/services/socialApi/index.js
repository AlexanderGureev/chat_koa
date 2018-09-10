const axios = require("axios");

const vkApi = async (methodName, params, accessToken) => {
  const options = {
    method: "get",
    url: `https://api.vk.com/method/${methodName}?${params}&access_token=${accessToken}&v=5.78`
  };

  const {
    data: { response }
  } = await axios(options);

  return response;
};

module.exports = {
  vkApi
};
