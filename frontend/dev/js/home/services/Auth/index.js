import axios from "axios";

const URL_LOGIN = "/api/isAuthenticated";
const URL_LOGOUT = "/logout";

export const isAuth = async () => {
  const {
    data: { isAuth }
  } = await axios.get(URL_LOGIN);
  return isAuth;
};

export const authenticateUser = async () => await isAuth();

export const logout = async () => {
  await axios.get(URL_LOGOUT);
  return false;
};
