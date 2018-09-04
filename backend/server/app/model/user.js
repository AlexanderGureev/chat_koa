const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { promisify } = require("util");
const randomBytes = promisify(crypto.randomBytes);
const uniqueValidator = require("mongoose-unique-validator");

mongoose.set("useCreateIndex", true);
const userSchema = mongoose.Schema({
  twitterId: String,
  vkId: String,
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
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

userSchema.plugin(uniqueValidator);

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

const validateUser = async model =>
  await Joi.validate(model, userValidateSchema);

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
