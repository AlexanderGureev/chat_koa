const mongoose = require("mongoose");

const tokensSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  access_token: {
    type: String,
    unique: true
  },
  refresh_token: String,
  created: {
    type: Date,
    default: Date.now()
  }
});

const tokenModel = mongoose.model("accessToken", tokensSchema);

module.exports = tokenModel;
