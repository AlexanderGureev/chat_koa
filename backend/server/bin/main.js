const Koa = require("koa");
const http = require("http");
const app = new Koa();
const middleware = require("../middleware");
const { connectionInit } = require("../app/services/mongodb");
const { passportInit } = require("../middleware/passport");
const { chatInit } = require("../app/services/chat");
const { PORT, env } = require("../config");
const colors = require("colors");
env !== "production" && require("../app/services/webpack")(app, env);

const server = http.createServer(app.callback());
connectionInit();
app.use(middleware(app));
chatInit(server);

passportInit();

server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`.black.bgWhite);
});
