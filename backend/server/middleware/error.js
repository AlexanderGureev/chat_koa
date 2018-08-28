module.exports = async (ctx, next) => {
  try {
      await next();
  } catch (err) {
      // will only respond with JSON
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = {
          status: ctx.status,
          message: err.message
      };
  }
};