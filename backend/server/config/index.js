const user = encodeURIComponent("chaterAdmin");
const password = encodeURIComponent("ajuNbS2909MXi");
const database = "chaterDB";

module.exports = {
  env: process.env.NODE_ENV || "dev_nodemon",
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || `mongodb://${user}:${password}@localhost:27017/${database}`
}