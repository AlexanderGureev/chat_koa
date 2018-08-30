const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const proxy = require("koa-proxy");
const router = new Router();
const convert = require("koa-convert");
const publicDir = path.join(__dirname, "..", "public");

router.get(["/", "/forgot"], async (ctx, next) => {
  ctx.type = "text/html";
  ctx.body = fs.createReadStream(publicDir + "/index.html");
});

router.get(
  "/api",
  convert(
    proxy({
      host: "http://localhost:3001"
    })
  )
);

module.exports.routes = () => router.routes();
module.exports.allowedMethods = () => router.allowedMethods();
