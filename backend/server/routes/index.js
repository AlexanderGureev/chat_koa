const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const proxy = require("koa-proxy");
const router = new Router();
const { env } = require("../config");
const passport = require("koa-passport");
const { responseMessage } = require("../app/services/responseMessage");
const { isAuthenticated } = require("../middleware/isAuth");
const {
  forgotPassword,
  checkToken,
  resetPassword,
  changePassword
} = require("../app/services/changePassword");
const {
  resetFormValidation,
  formValidation
} = require("../middleware/validate");

require("./api")(router);
require("./profile")(router);

if(env !== "none"){
  require("./chat")(router);
}
//router.get("/api", convert(proxy({ host: "http://localhost:3001"} )));

router.post("/register", formValidation, async ctx =>
  passport.authenticate("register", (err, user, info, status) => {
    if (!user) {
      ctx.throw(401, err);
    } else {
      ctx.body = responseMessage();
      return ctx.login(user);
    }
  })(ctx)
);

router.post("/auth", formValidation, async ctx =>
  passport.authenticate("auth", (err, user, info, status) => {
    if (!user) {
      ctx.throw(401, err);
    } else {
      ctx.body = responseMessage();
      return ctx.login(user);
    }
  })(ctx)
);

router.get("/logout", async ctx => {
  ctx.logout();
  ctx.session = null;
  ctx.redirect("/");
});

router.post(
  "/resetPassword/:token",
  checkToken,
  formValidation,
  resetFormValidation,
  resetPassword
);

router.post("/forgot", formValidation, forgotPassword);

router.post(
  "/changePassword",
  isAuthenticated,
  formValidation,
  resetFormValidation,
  changePassword
);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/plus.profile.emails.read"
    ]
  })
);

router.get("/auth/google/callback", async (ctx, next) =>
  passport.authenticate("google", (err, user, info, status) => {
    if (!user) {
      ctx.throw(401, err, { cookie: true });
    } else {
      ctx.redirect("/profile");
      return ctx.login(user);
    }
  })(ctx)
);

router.get(
  "/auth/vkontakte",
  passport.authenticate("vkontakte", {
    scope: ["status", "email", "photos"]
  })
);

router.get("/auth/vkontakte/callback", async (ctx, next) =>
  passport.authenticate("vkontakte", (err, user, info, status) => {
    if (!user) {
      ctx.throw(401, err, { cookie: true });
    } else {
      ctx.redirect("/profile");
      return ctx.login(user);
    }
  })(ctx)
);

router.get("/auth/twitter", passport.authenticate("twitter"));
router.get("/auth/twitter/callback", async (ctx, next) =>
  passport.authenticate("twitter", (err, user, info, status) => {
    if (!user) {
      ctx.throw(401, err, { cookie: true });
    } else {
      ctx.redirect("/profile");
      return ctx.login(user);
    }
  })(ctx)
);

if (env !== "none") {
  router.get("*", async (ctx, next) => {
    await ctx.render("index");
  });
}

module.exports.routes = () => router.routes();
module.exports.allowedMethods = () => router.allowedMethods();
