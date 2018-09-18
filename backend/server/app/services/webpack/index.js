const webpack = require("webpack");
const config = require("../../../../../webpack.config.js");
const koaWebpack = require("koa-webpack");
let compiler;

module.exports = (app, env) => {
  if(env !== "dev_webpack") {
    return;
  }
  compiler = webpack(config);
  koaWebpack({ compiler }).then(middleware => {
    app.use(middleware);
  });
};
