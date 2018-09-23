const isAuthenticated = (ctx, next) => {
  if (ctx.isAuthenticated()) {
    return next();
  } else {
    ctx.throw(401, new Error("Not authorized"), { cookie: true });
  }
};

module.exports.isAuthenticated = isAuthenticated;