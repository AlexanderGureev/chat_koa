const cookies = require("cookie");
const { store } = require("../redis");
const { User } = require("../../model/user");
const redis = require("redis");
const sub = redis.createClient(), 
      pub = redis.createClient();
const {
  newConnection,
  getAllUserConnection,
  deleteConnection
} = require("./socket-connections");
const prefix = "koa:sess:";

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
      const { _id, profile, username, email } = await getUser(headers);
      socket.user = {
        _id,
        profile,
        username,
        email
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

    socket.emit("connection_success", usersOnline);
    socket.broadcast.emit("user_connected", usersOnline);

    socket.on("disconnect", () => {
      socket.broadcast.emit("user_disconnect", deleteConnection(socket));
    });
  });
};

const chatInit = server => {
  const io = require("socket.io")(server);
  socketMiddleware(io);
  handlers(io);
};

module.exports = {
  chatInit
};
