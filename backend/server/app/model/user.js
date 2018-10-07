const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);

const userSchema = mongoose.Schema({
  twitterId: String,
  vkontakteId: String,
  googleId: String,
  provider: {
    type: String,
    default: "local"
  },
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: String,
  profile: {
    status: {
      type: String,
      default: "Сменить статус"
    },
    avatarPath: {
      type: String,
      default: "/img/ava_default.png"
    }
  },
  rooms: {
    type: Array,
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "rooms"
    },
    unread_messages: {
      type: Number,
      default: 0
    },
    name: String,
    join_date: Date
  },
  active_room:  mongoose.Schema.Types.ObjectId,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  offline_date: Date,
  online_date: Date
});

userSchema.plugin(uniqueValidator, {
  message: "{VALUE} уже используется"
});

const userValidateSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required(),
  username: Joi.string()
    .regex(/^[а-яёa-z0-9]/i)
    .min(4)
    .max(20)
    .required(),
  password: Joi.string()
    .min(3)
    .max(30)
    .required()
});

const User = mongoose.model("user", userSchema);

const validateUser = async ({ email, username, password }) =>
  await Joi.validate({ email, username, password }, userValidateSchema);

const hashPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw error;
  }
};

const checkPassword = async (password, hashPassword) => {
  try {
    const result = await bcrypt.compare(password, hashPassword);
    return result;
  } catch (error) {
    throw error;
  }
};

const generateResetToken = async () => {
  try {
    const token = await randomBytes(50);
    return token.toString("hex");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  User,
  validateUser,
  hashPassword,
  checkPassword,
  generateResetToken
};
