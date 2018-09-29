const { isAuthenticated } = require("../middleware/isAuth");

module.exports = router => {
  router.get("/chat", isAuthenticated, async (ctx, next) => {
    // ctx.cookies.set("id", ctx.state.user._id, { httpOnly: false });
    await ctx.render("chat");
  });
};
