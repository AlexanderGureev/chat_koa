const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  twitterId: String,
  vkId: String,
  googleId: String,
  provider: {
    type: String,
    default: "local"
  },
  email: String,
  username: String,
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

const userValidateSchema = Joi.object().keys({
  email: Joi.string().email().required(),
  username: Joi.string().regex(/^[а-яёa-z0-9]/i).min(4).max(20).required(),
  password: Joi.string().min(3).max(30).required()
});

const User = mongoose.model("user", userSchema);

const validateUser = async( model) => await Joi.validate(model, userValidateSchema);

const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (error) {
    throw (error);
  }
};

const checkPassword = async (password, user) => {
  try {
    const result = await bcrypt.compare(password, user.password);
    return result;
  } catch (error) {
    throw (error);
  }
};

const generateResetToken = function () {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(50, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf.toString("hex"));
      }
    });
  });
};

module.exports = {
  User,
  validateUser,
  hashPassword,
  checkPassword,
  generateResetToken
};