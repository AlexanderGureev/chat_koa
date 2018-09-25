const redis = require("redis");
const client = redis.createClient();
const { Rooms } = require("../../model/rooms");

const cachingMessage = async (id_rooms, messages) =>
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

const getMessages = async ({ room_id }) => {
  try {
    let messages = await client.lrangeAsync(`rooms:${room_id}:messages`, 0, -1);
    if (messages) {
      return messages;
    }
    const room = await Rooms.findById({ _id: room_id });
    if (!room) {
      throw new Error("Room is undefined");
    }
    return room.messages;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports.getMessages = getMessages;
