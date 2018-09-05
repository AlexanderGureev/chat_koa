const Koa = require("koa");
const app = new Koa();
const middleware = require("../middleware");
const { connectionInit } = require("../app/services/mongodb");
const { passportInit } = require("../middleware/passport");
const { PORT, env } = require("../config");
require("../app/services/webpack")(app, env);

connectionInit();
app.use(middleware(app));
passportInit();

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
