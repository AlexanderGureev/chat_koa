const Koa = require("koa");
const compose = require("koa-compose");
const app = new Koa();
const path = require("path");
const middleware = require("../middleware");

const { PORT, env } = require("../config");
require("../app/services/webpack")(app, env);

app.use(compose(middleware));

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
