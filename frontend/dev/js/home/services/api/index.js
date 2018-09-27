import axios from "axios";
import getToken from "../csrfToken";

const { NODE_ENV = "development" } = process.env;

const API_URL_MESSAGES = "api/messages/";
const API_URL_ROOM_CREATE = "api/room/create";
const API_URL_ROOM_DELETE = "api/room/delete/";
const API_URL_ROOM_UPDATE = "api/room/update/";
const API_URL_USER_PROFILE = "api/user/profile";

const noop = async () =>
  new Promise((res, rej) =>
    setTimeout(() => {
      res(2);
    }, 2000)
  );

export const getUser = async () => {
  try {
    const { data } = await axios.get(API_URL_USER_PROFILE);
    NODE_ENV === "development" && (await noop()); //временно

    return data;
  } catch (error) {
    throw new Error("Ошибка загрузки данных...");
  }
};

export const createRoom = async room => {
  try {
    const token = await getToken("/api/token");
    room._csrf = token;

    const {
      data: { status, message, info }
    } = await axios.post(API_URL_ROOM_CREATE, room);
    if (status !== 200) {
      throw new Error(message);
    }
    return JSON.parse(info);
  } catch (error) {
    throw new Error("Ошибка загрузки данных...");
  }
};

export const getMessages = async active_room => {
  try {
    const {
      data: { status, message, info }
    } = await axios.get(`${API_URL_MESSAGES}${active_room}`);
    if (status !== 200) {
      throw new Error(message);
    }
    return info;
  } catch (error) {
    throw new Error("Ошибка загрузки данных...");
  }
};

export const deleteRoom = async id => {
  try {
    const token = await getToken("/api/token");
    const {
      data: { status, message, info }
    } = await axios.delete(`${API_URL_ROOM_DELETE}${id}`, {
      headers: { "X-CSRF-Token": `${token}` }
    });
    if (status !== 200) {
      throw new Error(message);
    }
    return info;
  } catch (error) {
    throw new Error("Ошибка отправки запроса...");
  }
};
