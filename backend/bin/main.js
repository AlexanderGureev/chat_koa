const Koa = require("koa");

const webpack = require("webpack");
const config = require("../../webpack.config.js");
const compiler = webpack(config);
const koaWebpack = require("koa-webpack");

const PORT = process.env.PORT || 3000;

const app = new Koa();

koaWebpack({ compiler })
 .then((middleware) => {
  app.use(middleware);
});

app.listen(PORT, () => {
    console.log("Server start");
});