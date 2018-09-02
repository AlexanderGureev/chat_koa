const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const proxy = require("koa-proxy");
const router = new Router();
const convert = require("koa-convert");
const passport = require("passport");
const publicDir = path.join(__dirname, "..", "public");

const routes = ["/", "/forgot", "/profile"];

router.get(routes, async (ctx, next) => {
  await ctx.render("index");
});

router.get("/chat", async (ctx, next) => {
  await ctx.render("chat");
});

router.get(
  "/api",
  convert(
    proxy({
      host: "http://localhost:3001"
    })
  )
);

router.post("/register", function(ctx) {
  return passport.authenticate("register", function(err, user, info, status) {
    console.log(user)
    if (!user) {
      ctx.body = { success: false };
      ctx.throw(401);
    } else {
      ctx.body = { success: true };
      return ctx.login(user);
    }
  })(ctx);
});

module.exports.routes = () => router.routes();
module.exports.allowedMethods = () => router.allowedMethods();
