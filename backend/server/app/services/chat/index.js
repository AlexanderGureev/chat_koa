const cookies = require("cookie");
const { store } = require("../redis");
const { User } = require("../../model/user");
const bluebird = require("bluebird");
const colors = require("colors");
const redis = require("redis");
const async = require("async");
const {
  Types: { ObjectId }
} = require("mongoose");
const sub = redis.createClient(),
  pub = redis.createClient(),
  client = redis.createClient();
const {
  newConnection,
  getAllUserConnection,
  deleteConnection
} = require("./socket-connections");
const { Rooms, validateRooms } = require("../../model/rooms");

const prefix = "koa:sess:";
bluebird.promisifyAll(redis);

let id_generalRoom;
const fixtureMessages = JSON.stringify([
  {
    id: "34123",
    user_id: "14112",
    author: "Саня Гуреев",
    avatarPath: "/img/ava_default.png",
    text: "asdasdasda",
    date: Date.now(),
    status: "created"
  },
  {
    id: "3412332",
    user_id: "14122",
    author: "Саня Гуреев",
    avatarPath: "/img/ava_default.png",
    text: "asdasdasda",
    date: Date.now(),
    status: "created"
  },
  {
    id: "341253332",
    user_id: "14125",
    author: "Саня Гуреев",
    avatarPath: "/img/ava_default.png",
    text: "asdasdasda",
    date: Date.now(),
    status: "created"
  },
  {
    id: "341212332",
    user_id: "14123",
    author: "Саня Гуреев",
    avatarPath: "/img/ava_default.png",
    text: "asdasdasda",
    date: Date.now(),
    status: "created"
  },
  {
    id: "341233252",
    user_id: "14122",
    author: "Саня Гуреев",
    avatarPath: "/img/ava_default.png",
    text: "asdasdasda",
    date: Date.now(),
    status: "created"
  },
  {
    id: "341233522",
    user_id: "14121",
    author: "Саня Гуреев",
    avatarPath: "/img/ava_default.png",
    text: "asdasdasda",
    date: Date.now(),
    status: "created"
  }
]);

const getIdGeneralRoom = () => {
  if (id_generalRoom) {
    return id_generalRoom;
  }
  throw new Error("General room is undefined");
};
const getOrCreateGeneralRoom = async () => {
  try {
    let generalRoom = await Rooms.findOne({ name: "General" });
    if (generalRoom) {
      console.log("General room was updated".bgBlue.black);
      const { _id, messages } = generalRoom;
      id_generalRoom = _id;
      if (!messages.length) {
        return;
      }

      await client.delAsync(`rooms:${_id}:messages`);
      async.forEach(
        messages,
        async value => {
          await client.rpushAsync(`rooms:${_id}:messages`, value);
        },
        err => {
          if (err) {
            console.error(err.message);
          }
        }
      );
      return;
    }
    generalRoom = new Rooms({
      name: "General"
    });
    const { _id } = await generalRoom.save();
    id_generalRoom = _id;
    console.log("General room was created".bgBlue.black);
  } catch (error) {
    console.log(error);
    process.exit(0);
  }
};
const getUser = async ({ cookie }) => {
  try {
    const sid = cookies.parse(cookie)["chater:session"];
    const {
      passport: { user }
    } = await store.get(prefix + sid);

    return await User.findById(user);
  } catch (error) {
    throw new Error("Not authorized");
  }
};
const socketMiddleware = io => {
  io.use(async (socket, next) => {
    const {
      handshake: { headers }
    } = socket;

    try {
      const {
        _id,
        profile,
        username,
        email,
        rooms,
        active_room
      } = await getUser(headers);
      socket.user = {
        _id,
        profile,
        username,
        email,
        rooms,
        active_room
      };
    } catch (error) {
      console.log(error);
      return next(error);
    }
    next();
  });
};
const handlers = io => {
  io.on("connection", socket => {
    newConnection(socket);
    const usersOnline = getAllUserConnection();

    const data = {
      users: usersOnline,
      user: socket.user
    };

    socket.emit("connection_success", data);
    socket.broadcast.emit("user_connected", data);

    socket.on("disconnect", () => {
      socket.broadcast.emit("user_disconnect", deleteConnection(socket));
    });

    socket.on("new_message", message => {
      const {
        _id,
        profile: { avatarPath },
        username,
        active_room
      } = socket.user;

      const newMessage = JSON.stringify({
        _id: ObjectId(),
        user_id: _id,
        avatarPath,
        date: Date.now(),
        text: message,
        author: username
      });

      pub.rpushAsync(`rooms:${active_room}:messages`, newMessage);
      pub.publish("rooms_messages_latest", newMessage);

      Rooms.findById({ _id: active_room })
        .then(room => {
          if (!room) {
            throw new Error("room is undefined");
          }
          room.messages.push(newMessage);
          return room.save();
        })
        .catch(error => console.error(error));
    });
  });
};
const redisPubSubInit = io => {
  sub.on("message", function(channel, message) {
    io.emit(channel, message);
  });
  sub.subscribe("rooms_messages_latest");
};

const chatInit = server => {
  const io = require("socket.io")(server);
  getOrCreateGeneralRoom();
  socketMiddleware(io);
  handlers(io);
  redisPubSubInit(io);
};

module.exports = {
  chatInit,
  getIdGeneralRoom
};
