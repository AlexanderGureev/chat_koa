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
const compose = require("koa-compose");
const CSRF = require("koa-csrf");
const { SESSION_KEY, REDIS_URI } = require("../config");

const publicDir = path.join(__dirname, "..", "public");
const pathToFavicon = path.join(publicDir, "img", "favicon.png");

const CONFIG = {
  key: "chater:session",
  maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week,
  httpOnly: true,
  signed: true,
  store: redisStore({
    url: REDIS_URI
  })
};
const ejsOptions = {
  root: publicDir,
  layout: false,
  viewExt: "html"
};
const csrfConfig = {
  invalidSessionSecretMessage: "Invalid session secret",
  invalidSessionSecretStatusCode: 403,
  invalidTokenMessage: "Invalid CSRF token",
  invalidTokenStatusCode: 403
};

module.exports = app => {
  app.keys = [SESSION_KEY];
  render(app, ejsOptions);

  return compose([
    error,
    logger(),
    helmet(),
    compress(),
    bodyParser(),
    session(CONFIG),
    //new CSRF(csrfConfig),
    passport.initialize(),
    passport.session(),
    routes(),
    allowedMethods(),
    static(publicDir),
    favicon(pathToFavicon)
  ]);
};
