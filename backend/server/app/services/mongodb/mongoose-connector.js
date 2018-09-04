const mongoose = require("mongoose");
mongoose.Promise = Promise;

module.exports = MONGO_URI => {
  if (!MONGO_URI) {
    throw new Error("Mongo uri is undefined");
  }

  return new Promise((resolve, reject) => {
    mongoose
      .connect(MONGO_URI, { useNewUrlParser: true })
      .then(db => {
        resolve(db);
      })
      .catch(err => {
        reject(err);
      });
  });
};
