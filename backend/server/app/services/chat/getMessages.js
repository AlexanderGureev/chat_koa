const redis = require("redis");
const { REDIS_URI } = require("../../../config");
const client = redis.createClient(REDIS_URI);
const { Rooms } = require("../../model/rooms");
const async = require("async");

const cachingMessage = async (id_rooms, messages) => {
  await client.delAsync(`rooms:${id_rooms}:messages`);
  async.forEach(
    messages,
    async value => {
      await client.rpushAsync(`rooms:${id_rooms}:messages`, value);
    },
    err => {
      if (err) {
        console.error(err.message);
      }
    }
  );
};

const getMessages = async ({ room_id }, { start = 0, end = -1 }) => {
  try {
    let messages = await client.lrangeAsync(
      `rooms:${room_id}:messages`,
      start,
      end
    );

    if (messages.length) {
      console.log(`room: ${room_id}: cache given`.bgGreen.black);
      return messages;
    }

    const room = await Rooms.findById({ _id: room_id });
    if (!room) {
      throw new Error("Room is undefined");
    }
    console.log(`room: ${room_id}: mongodb given`);

    cachingMessage(room_id, room.messages);

    if (start === 0 && end === -1) {
      return room.messages;
    }
    const res = room.messages.filter(
      (message, i, arr) =>
        i > arr.length - Math.abs(start) && (i <= end || end === -1)
    );
    return res;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getMessages = getMessages;
