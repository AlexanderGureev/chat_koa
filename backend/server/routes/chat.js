const { isAuthenticated } = require("../middleware/isAuth");

module.exports = router => {
  router.get("/chat", isAuthenticated, async (ctx, next) => {
    await ctx.render("chat");
  });
};
