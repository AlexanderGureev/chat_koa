const fs = require("fs");
const path = require("path");
const Router = require("koa-router");
const proxy = require("koa-proxy");
const router = new Router();
const passport = require("passport");
const { responseMessage } = require("../app/services/responseMessage");
const { isAuthenticated } = require("../middleware/isAuth");
const { addAvatar, delAvatar, setStatus } = require("../app/services/profile");
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

const routes = [
  "/",
  "/forgot",
  "/profile",
  "/resetPassword/:token",
  "/changePassword"
];

router.get(routes, async (ctx, next) => {
  await ctx.render("index");
});

router.get("/chat", isAuthenticated, async (ctx, next) => {
  await ctx.render("chat");
});

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

router.get("/api/token", async ctx => {
  ctx.body = { token: ctx.csrf };
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

router.post("/profile/add/avatar", isAuthenticated, addAvatar);
router.delete("/profile/delete/avatar", isAuthenticated, delAvatar);
router.put("/profile/status/change", isAuthenticated, setStatus);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/plus.login",
      "https://www.googleapis.com/auth/plus.profile.emails.read"
    ]
  })
);

router.get("/auth/google/callback", async ctx =>
  passport.authenticate("google", (err, user, info, status) => {
    if (!user) {
      ctx.throw(401, err);
    } else {
      ctx.body = responseMessage();
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

router.get("/auth/vkontakte/callback", async ctx =>
  passport.authenticate("vkontakte", (err, user, info, status) => {
    if (!user) {
      ctx.throw(401, err);
    } else {
      ctx.body = responseMessage();
      return ctx.login(user);
    }
  })(ctx)
);

router.get("/auth/twitter", passport.authenticate("twitter"));
router.get("/auth/twitter/callback", async ctx =>
  passport.authenticate("twitter", (err, user, info, status) => {
    if (!user) {
      ctx.throw(401, err);
    } else {
      ctx.body = responseMessage();
      return ctx.login(user);
    }
  })(ctx)
);
module.exports.routes = () => router.routes();
module.exports.allowedMethods = () => router.allowedMethods();
