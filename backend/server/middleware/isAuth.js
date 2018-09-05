const isAuthenticated = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.redirect("/");
  }
};

module.exports.isAuthenticated = isAuthenticated;