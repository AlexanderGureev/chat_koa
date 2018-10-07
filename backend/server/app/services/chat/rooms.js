const { Rooms, validateRooms, hashPassword } = require("../../model/rooms");
const { User } = require("../../model/user");
const redis = require("redis");
const { REDIS_URI } = require("../../../config");
const client = redis.createClient(REDIS_URI);
const async = require("async");

const createRoom = async (room, user_id) => {
  try {
    await validateRooms(room);

    if (!room.public) {
      const hash = await hashPassword(room.password);
      room.password = hash;
    }
    let newRoom = new Rooms(room);
    newRoom = await newRoom.save();
    _cachingRoom(newRoom);

    const user = await User.findById(user_id);
    user.rooms.push({
      _id: newRoom._id,
      name: newRoom.name
    });
    await user.save();
    return newRoom;
  } catch (error) {
    throw error;
  }
};

const deleteRoom = async (id, user_id) => {
  try {
    const room = await Rooms.findById(id);

    if (!room) {
      throw new Error("Комнаты с таким id не существует.");
    }
    if (room.room_author.toString() === user_id.toString()) {
      await Rooms.deleteOne({ _id: id });
      _removeRoomFromCache(id);
    }

    let user = await User.findById(user_id);
    user.rooms = user.rooms.filter(
      ({ _id }) => _id.toString() !== id.toString()
    );
    await user.save();
    return id;
  } catch (error) {
    throw error;
  }
};

const _removeRoomFromCache = async _id =>
  await client.hdelAsync(`list:rooms`, `${_id}`);

const _cachingRoom = async ({ _id, name, public, created, room_author }) => {
  const data = JSON.stringify({ _id, name, public, created, room_author });
  return await client.hsetAsync(`list:rooms`, `${_id}`, data);
};
const _cachingRooms = async rooms => {
  const callback = async ({ _id, name, public, created, room_author }) => {
    const data = JSON.stringify({ _id, name, public, created, room_author });
    await client.hsetAsync(`list:rooms`, `${_id}`, data);
  };

  async.forEach(rooms, callback, err => {
    if (err) {
      console.error(err.message);
    }
  });
};
const _getMatches = (list, matchStr) => {
  const end = matchStr.length;

  return list.reduce((acc, room) => {
    const { _id, name, public, created, room_author } = room;
    return name.slice(0, end) === matchStr
      ? [...acc, { _id, name, public, created, room_author }]
      : acc;
  }, []);
};
const getRooms = async matchStr => {
  try {
    let rooms = await client.hgetallAsync(`list:rooms`);
    if (rooms) {
      const list = Object.values(rooms).map(JSON.parse);
      return _getMatches(list, matchStr);
    }
    rooms = await Rooms.find({});
    _cachingRooms(rooms);

    return _getMatches(rooms, matchStr);
  } catch (error) {
    throw error;
  }
};

const updateRoom = async data => {};
module.exports = {
  createRoom,
  deleteRoom,
  updateRoom,
  getRooms
};
