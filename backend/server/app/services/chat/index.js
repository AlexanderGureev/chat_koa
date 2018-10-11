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
const Invitation = require("../../model/invitations");

const prefix = "koa:sess:";
bluebird.promisifyAll(redis);

let id_generalRoom;
// const fixtureMessages = Array.from({ length: 10000 }, (item, i) =>
//   JSON.stringify({
//     id: "5bb0050d4f3f0e3d880521a9",
//     user_id: "5bb005034f3f0e3d880521a8",
//     author: "Саня Гуреев",
//     avatarPath: "/img/ava_default.png",
//     text: `${i}`,
//     date: Date.now(),
//     status: "created"
//   })
// );
// const fixtureMessages = [JSON.stringify(
//   {
//   id: "5bb0050d4f3f0e3d880521a9",
//   user_id: "5bb005034f3f0e3d880521a8",
//   author: "Саня Гуреев",
//   avatarPath: "/img/ava_default.png",
//   text: "qwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwww",
//   date: Date.now(),
//   status: "created"
// }),
// JSON.stringify(
//   {
//   id: "5bb0050d4f3f0e3d880521a9",
//   user_id: "5bb005034f3f0e3d880521a8",
//   author: "Саня Гуреев",
//   avatarPath: "/img/ava_default.png",
//   text: "qwwwwww",
//   date: Date.now(),
//   status: "created"
// }),
// JSON.stringify(
//   {
//   id: "5bb0050d4f3f0e3d880521a9",
//   user_id: "5bb005034f3f0e3d880521a8",
//   author: "Саня Гуреев",
//   avatarPath: "/img/ava_default.png",
//   text: "qwwwwwwqwwwwww",
//   date: Date.now(),
//   status: "created"
// }),
// JSON.stringify(
//   {
//   id: "5bb0050d4f3f0e3d880521a9",
//   user_id: "5bb005034f3f0e3d880521a8",
//   author: "Саня Гуреев",
//   avatarPath: "/img/ava_default.png",
//   text: "qwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwww",
//   date: Date.now(),
//   status: "created"
// }),JSON.stringify(
//   {
//   id: "5bb0050d4f3f0e3d880521a9",
//   user_id: "5bb005034f3f0e3d880521a8",
//   author: "Саня Гуреев",
//   avatarPath: "/img/ava_default.png",
//   text: "qwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwww",
//   date: Date.now(),
//   status: "created"
// }),
// JSON.stringify(
//   {
//   id: "5bb0050d4f3f0e3d880521a9",
//   user_id: "5bb005034f3f0e3d880521a8",
//   author: "Саня Гуреев",
//   avatarPath: "/img/ava_default.png",
//   text: "qwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwww",
//   date: Date.now(),
//   status: "created"
// }),
// JSON.stringify(
//   {
//   id: "5bb0050d4f3f0e3d880521a9",
//   user_id: "5bb005034f3f0e3d880521a8",
//   author: "Саня Гуреев",
//   avatarPath: "/img/ava_default.png",
//   text: "qwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwwwqwwwwww",
//   date: Date.now(),
//   status: "created"
// })
// ];
const getUnreadMessages = (user_rooms, dateOffline) =>
  new Promise((resolve, reject) => {
    const time = dateOffline.getTime();
    const ids = user_rooms.map(({ _id }) => _id);

    const resultProcessing = (err, res) => {
      if (err) {
        return reject(err);
      }
      resolve(res);
    };

    async.reduce(
      ids,
      {},
      async (acc, id) => {
        const jsonData = await client.lrangeAsync(
          `rooms:${id}:messages`,
          0,
          -1
        );
        const room = jsonData.map(JSON.parse);
        const count = room.filter(({ date }) => date > time).length;
        return { ...acc, [id]: count };
      },
      resultProcessing
    );
  }); //Всегда ли есть сообщения в кеше?

const getIdGeneralRoom = () => {
  if (id_generalRoom) {
    return id_generalRoom;
  }
  throw new Error("General room is undefined");
};
const getOrCreateGeneralRoom = async () => {
  try {
    let generalRoom = await Rooms.findOne({ name: "General" });
    // generalRoom.messages = fixtureMessages; //тест
    // await generalRoom.save();

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
        active_room,
        offline_date,
        online_date
      } = await getUser(headers);
      socket.user = {
        _id,
        profile,
        username,
        email,
        rooms,
        active_room,
        offline_date,
        online_date
      };
    } catch (error) {
      console.log(error);
      return next(new Error("authentication error"));
    }
    await next();
  });
  io.use(async ({ user }, next) => {
    user.online_date = new Date();
    const { offline_date, rooms } = user;

    if (offline_date) {
      try {
        const res = await getUnreadMessages(rooms, offline_date);
        user.rooms = rooms.reduce(
          (acc, room) => [
            ...acc,
            { ...room, unread_messages: res[room._id] || 0 }
          ],
          []
        );
      } catch (error) {
        console.log(error);
      }
    }
    await next();
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
const saveUserData = async (room_id, user_id, dateOnline) => {
  try {
    const user = await User.findById(user_id);
    user.active_room = room_id;
    user.online_date = dateOnline;
    user.offline_date = Date.now();
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
  const { active_room, _id, online_date } = socket.user;
  socket.broadcast.to(active_room).emit("user_disconnect", {
    users: socketManager.deleteConnection(socket),
    room_id: active_room
  });
  if (reason === "transport close") {
    saveUserData(active_room, _id, online_date);
  }
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
const handlerInvitation = socket => async invitation_id => { //Обработка ошибок не работает!!!!!!!
  try {
    const { room_id } = await Invitation.findOne({ invitation_id });
    const { _id, name } = await Rooms.findById(room_id);
    const user = await User.findById(socket.user._id);

    user.rooms.push({ _id, name });
    socket.user.rooms.push({ _id, name })

    handlerChangeRoom(socket)(_id);
    await user.save();
  } catch(error) {
    console.log(error);
    //throw error;
  }
}
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
    socket.on("call_invitation", handlerInvitation(socket));
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
