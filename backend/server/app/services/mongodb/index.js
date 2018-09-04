const { MONGO_URI } = require("../../../config");
const mongooseConnector = require("./mongoose-connector");

const connectionInit = () => {
  mongooseConnector(MONGO_URI)
    .then(db => {
      console.log("Successfully connected to database chaterDB");
    })
    .catch(err => {
      console.log(err);
      process.exit(0);
    });
};

module.exports = {
  connectionInit,
  mongooseConnector
};
