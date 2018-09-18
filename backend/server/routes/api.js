const { isAuthenticated } = require("../middleware/isAuth");
const { User } = require("../app/model/user");

module.exports = router => {
  router.get("/api/token", async ctx => {
    ctx.body = { token: ctx.csrf };
  });
  router.get("/api/isAuthenticated", async ctx => {
    ctx.body = { isAuth: ctx.isAuthenticated() };
  });
  router.get("/api/user/profile", isAuthenticated, async ctx => {
    try {
      const {
        profile: { status, avatarPath },
        email,
        username,
        provider
      } = await User.findById(ctx.state.user._id);
      ctx.body = {
        status,
        avatarPath,
        email,
        username,
        provider
      };
    } catch (error) {
      throw error;
    }
  });
};
