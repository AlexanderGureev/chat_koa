import axios from "axios";

const getToken = async apiUrl => {
  const {
    data: { token }
  } = await axios.get(apiUrl);
  return token;
};

export default getToken;