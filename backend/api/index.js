const Koa = require("koa");
const logger = require("koa-logger");

const PORT = process.env.PORT || 3001;

const app = new Koa();

app.use(logger());
app.use(async (ctx, next) => {
  ctx.body = "hello api server";
})

app.listen(PORT, () => {
    console.log(`Api server start on ${PORT}`);
});