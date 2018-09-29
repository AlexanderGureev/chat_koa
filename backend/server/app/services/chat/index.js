const cookies = require("cookie");
const { store } = require("../redis");
const { User } = require("../../model/user");
const bluebird = require("bluebird");
const colors = require("colors");
const redis = require("redis");
const async = require("async");
const { REDIS_URI } = require("../../../config");
const {
  Types: { ObjectId }
} = require("mongoose");
const sub = redis.createClient(REDIS_URI),
  pub = redis.createClient(REDIS_URI),
  client = redis.createClient(REDIS_URI);

const socketManager = require("./socket-connections")();
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
      name: "General",
      room_author: ObjectId()
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
      return next(new Error("authentication error"));
    }
    next();
  });
};
const joinRooms = socket => {
  const { rooms } = socket.user;
  rooms.forEach(({ _id }) => socket.join(_id));
};
const leaveRoom = socket => {
  socket.leave(active_room);
};
const saveToMongo = async (room_id, messages) => {
  try {
    const room = await Rooms.findById(room_id);
    room.messages.push(messages);
    await room.save();
  } catch (error) {
    throw error;
  }
};
const changeActiveRoom = async (room_id, user_id) => {
  try {
    const user = await User.findById(user_id);
    user.active_room = room_id;
    await user.save();
  } catch (error) {
    throw error;
  }
};
const handlerNewMessage = socket => message => {
  const {
    _id,
    profile: { avatarPath },
    username,
    active_room
  } = socket.user;

  const newMessage = {
    _id: ObjectId(),
    user_id: _id,
    avatarPath,
    date: Date.now(),
    text: message,
    author: username
  };

  pub.rpushAsync(`rooms:${active_room}:messages`, JSON.stringify(newMessage));
  pub.publish(
    "rooms_messages_latest",
    JSON.stringify({
      room: active_room,
      message: newMessage
    })
  );
  saveToMongo(active_room, JSON.stringify(newMessage));
};
const handlerDisconnect = socket => reason => {
  const { active_room, _id } = socket.user;
  socket.broadcast.to(active_room).emit("user_disconnect", {
    users: socketManager.deleteConnection(socket),
    room_id: active_room
  });

  changeActiveRoom(active_room, _id);
};
const handlerDeleteRoom = socket => id => {
  socket.leave(id);

  const { rooms } = socket.user;
  socket.user.rooms = rooms.filter(
    ({ _id }) => _id.toString() !== id.toString()
  );

  if (!socket.user.rooms.length) {
    //ВРЕМЕННО
    socket.user.active_room = getIdGeneralRoom();
    socket.emit("connection_success", {
      users: [],
      user: socket.user
    });
    return;
  }
  const { _id } = socket.user.rooms[0];
  handlerChangeRoom(socket)(_id);
};
const handlerChangeRoom = socket => id => {
  socket.emit("disconnect");

  socket.user.active_room = id;
  socket.join(id);

  socketManager.newConnection(socket);

  const response = getData(socket);

  socket.emit("connection_success", response);
  socket.broadcast.to(id).emit("user_connected", response);
};
const handlerUpdateRooms = socket => newRoom => socket.user.rooms.push(newRoom);
const hanglerSocketError = socket => error => {
  console.log("Received error from client:".bgRed.black, socket.id);
  console.log(error);
};
const getData = ({ user }) => ({
  users: socketManager.getConnection(user.active_room),
  user,
  room_id: user.active_room
});
const handlers = io => {
  io.on("connection", socket => {
    joinRooms(socket);
    socketManager.newConnection(socket);

    const { active_room } = socket.user;
    const response = getData(socket);

    socket.emit("connection_success", response);
    socket.broadcast.to(active_room).emit("user_connected", response);

    socket.on("change_room", handlerChangeRoom(socket));
    socket.on("delete_room", handlerDeleteRoom(socket));
    socket.on("disconnect", handlerDisconnect(socket));
    socket.on("new_message", handlerNewMessage(socket));
    socket.on("update_rooms_list", handlerUpdateRooms(socket));
    socket.on("error", hanglerSocketError(socket));
  });
};
const redisPubSubInit = io => {
  sub.on("message", function(channel, data) {
    const { room, message } = JSON.parse(data);
    message.room_id = room;
    io.to(room).emit(channel, JSON.stringify(message));
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
