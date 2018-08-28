const Koa = require("koa");
const static = require("koa-static");
const logger = require("koa-logger");
const error = require("../middleware/error");
const app = new Koa();
const path = require("path");


const { PORT, env } = require("../config");
require("../app/services/webpack")(app, env);

const { routes, allowedMethods } = require("../routes");


app.use(error);
app.use(logger());
app.use(routes());
app.use(allowedMethods());

app.use(static(path.join(__dirname, "..", "public")));

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
