const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const { Schema } = mongoose;

const roomsSchema = Schema({
  name: String,
  messages: {
    type: Array,
    _id: Schema.Types.ObjectId,
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    text: String,
    date: {
      type: Date,
      default: Date.now()
    },
    status: String
  },
  public: {
    type: Boolean,
    default: true
  },
  room_author: Schema.Types.ObjectId,
  created: {
    type: Date,
    default: Date.now()
  }
});

const roomsValidateSchema = Joi.object().keys({
  name: Joi.string().required(),
  room_author: Joi.required(),
});

const Rooms = mongoose.model("rooms", roomsSchema);
const validateRooms = async ({ name, room_author }) =>
  await Joi.validate({ name, room_author }, roomsValidateSchema);

module.exports = {
  Rooms,
  validateRooms
};
