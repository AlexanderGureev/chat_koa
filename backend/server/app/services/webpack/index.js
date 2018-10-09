const config = require("../../../../../webpack.config.js");
const koaWebpack = require("koa-webpack");
const path = require("path");
const { isAuthenticated } = require("../../../middleware/isAuth");

module.exports = async (app, env) => {
  if (env !== "none") {
    return;
  }

  try {
    const middleware = await koaWebpack({
      config,
      hotClient: { allEntries: true }
    });
    app.use(middleware);

    app.use(async (ctx, next) => {
      const [, url ] = ctx.url.split("/");
      const pathname = url === "chat" ? "chat.html" : "index.html";

      const filename = path.resolve(config.output.path, pathname);
      ctx.type = "html";
      ctx.body = middleware.devMiddleware.fileSystem.createReadStream(filename);
      await next();
    });

    app.use(async (ctx, next) => {
      if (ctx.url === "/chat") {
        await isAuthenticated(ctx, next);
      }
    });

  } catch (error) {
    throw error;
  }
};
