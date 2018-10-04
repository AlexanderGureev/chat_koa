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
const selectMessages = (messages, start, end) => {
  if (start === "0" && end === "-1") {
    return messages;
  }
  const convertStart = messages.length - Math.abs(start);
  const convertEnd = end === "-1" ? messages.length : messages.length - Math.abs(end);
  let data = [];
  for (let i = convertStart; i < convertEnd; i++) {
    if(messages[i]) {
      data.push(messages[i]);
    }
  }
  return data;
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
    return selectMessages(room.messages, start, end);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getMessages = getMessages;
