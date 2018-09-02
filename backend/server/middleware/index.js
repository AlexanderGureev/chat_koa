const path = require("path");
const logger = require("koa-logger");
const error = require("./error");
const static = require("koa-static");
const helmet = require("koa-helmet");
const compress = require("koa-compress");
const favicon = require("koa-favicon");
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const render = require("koa-ejs");
const { routes, allowedMethods } = require("../routes");
const bodyParser = require("koa-bodyparser");
const passport = require("koa-passport");
const publicDir = path.join(__dirname, "..", "public");

const CONFIG = {
  key: "chater:session",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
  httpOnly: true,
  signed: true,
  store: redisStore()
};
const ejsOptions = {
  root: publicDir,
  layout: false,
  viewExt: "html"
};

module.exports = app => {
  app.keys = ["chater_secret"];
  render(app, ejsOptions);

  return [
    error,
    logger(),
    helmet(),
    compress(),
    bodyParser(),
    session(CONFIG),
    passport.initialize(),
    passport.session(),
    routes(),
    allowedMethods(),
    static(publicDir),
    favicon(path.join(publicDir, "img", "favicon.png"))
  ];
};
