const { User } = require("../../model/user");
const redis = require("redis");
const { REDIS_URI } = require("../../../config");
const client = redis.createClient(REDIS_URI);
const async = require("async");

const _removeUserFromCache = async _id =>
  await client.hdelAsync(`list:users`, `${_id}`);

const updateUserDataInCache= async ({ _id, username, email, profile, offline_date, online_date }) => {
  const data = JSON.stringify({ _id, username, email, avatarPath: profile.avatarPath, offline_date, online_date });
  return await client.hsetAsync(`list:users`, `${_id}`, data);
};

const _cachingUsers = async users => {
  const callback = async ({ _id, username, email, profile, offline_date, online_date }) => {
    const data = JSON.stringify({ _id, username, email, avatarPath: profile.avatarPath, offline_date, online_date });
    await client.hsetAsync(`list:users`, `${_id}`, data);
  };

  async.forEach(users, callback, err => {
    if (err) {
      console.error(err.message);
    }
  });
};
const _getMatches = (list, matchStr) => {
  const end = matchStr.length;

  return list.reduce((acc, user) => {
    const { _id, username, email, avatarPath, offline_date, online_date } = user;
    return username.slice(0, end) === matchStr
      ? [...acc, { _id, username, email, avatarPath, offline_date, online_date }]
      : acc;
  }, []);
};

const getUsers = async matchStr => {
  try {
    let users = await client.hgetallAsync(`list:users`);
    if (users) {
      const list = Object.values(users).map(JSON.parse);
      return _getMatches(list, matchStr);
    }
    users = await User.find({});
    _cachingUsers(users);

    return _getMatches(users, matchStr);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUsers,
  updateUserDataInCache
};
