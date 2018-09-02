const Koa = require("koa");
const compose = require("koa-compose");
const app = new Koa();
const middleware = require("../middleware");
const { connectionInit } = require("../app/services/mongodb");
const { passportInit } = require("../middleware/passport");
const { PORT, env } = require("../config");
require("../app/services/webpack")(app, env);

connectionInit();
app.use(compose(middleware(app)));
passportInit();



app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
