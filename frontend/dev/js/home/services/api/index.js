import axios from "axios";

const noop = async () =>
new Promise((res, rej) =>
  setTimeout(() => {
    res(2);
  }, 2000)
);

export const getUser = async () => {
  try {
    const { data } = await axios.get("/api/user/profile");
    await noop();
    return data;
  } catch (error) {
    throw new Error("Ошибка загрузки данных...");
  }
};
