const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const proxy = require("koa-proxy");
const router = new Router();
const convert = require("koa-convert");
const passport = require("passport");
const { forgotPassword, checkToken, resetPassword, changePassword } = require("../app/services/changePassword");

const routes = ["/", "/forgot", "/profile", "/resetPassword/:token", "/changePassword"];

const isAuthenticated = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.redirect("/");
  }
};

router.get(routes, async (ctx, next) => {
  await ctx.render("index");
});

router.get("/chat", isAuthenticated, async (ctx, next) => {
  await ctx.render("chat");
});

router.get("/api", convert(proxy({ host: "http://localhost:3001"} )));

router.post("/register", async ctx =>
  passport.authenticate("register", (err, user, info, status) => {
    if (!user) {
      ctx.body = { success: false };
      ctx.throw(401);
    } else {
      ctx.body = { success: true };
      return ctx.login(user);
    }
  })(ctx)
);

router.post("/auth", async ctx =>
  passport.authenticate("auth", (err, user, info, status) => {
    if (!user) {
      ctx.body = { success: false };
      ctx.throw(401);
    } else {
      ctx.body = { success: true };
      return ctx.login(user);
    }
  })(ctx)
);

router.get("/logout", async ctx => {
  ctx.logout();
  ctx.session = null;
  ctx.redirect("/");
});


router.post("/resetPassword/:token", checkToken, resetPassword);
router.post("/forgot", forgotPassword);
router.post("/changePassword", isAuthenticated, changePassword);

module.exports.routes = () => router.routes();
module.exports.allowedMethods = () => router.allowedMethods();
