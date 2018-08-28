const path = require("path");
const logger = require("koa-logger");
const error = require("./error");
const static = require("koa-static");
const helmet = require("koa-helmet");
const compress = require("koa-compress");
const { routes, allowedMethods } = require("../routes");

module.exports = [
  error, 
  logger(),
  helmet(), 
  compress(),
  // routes(), 
  // allowedMethods(),
  static(path.join(__dirname, "..", "public")),
];