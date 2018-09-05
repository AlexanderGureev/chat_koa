const { User } = require("../../model/user");
const multer = require("koa-multer");
const path = require("path");
const del = require("del");
const { responseMessage } = require("../responseMessage");

const publicPath = path.join("img", "uploads");
const pathStore = path.join("public", "img", "uploads");
const allowedExt = [".png", ".jpg", ".gif", ".jpeg"];
const defaultAvatar = path.join("img", "ava_default.png");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathStore);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    const isValid = allowedExt.some(e => e === ext);
    if (!isValid) {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
  limits: {
    fileSize: 1024 * 1024
  }
}).single("avatar");

const addAvatar = async (ctx, next) => {
  try {
    const {
      req: { file }
    } = await upload(ctx);
    const { avatarPath } = await _updateAvatar(ctx.state.user, file);
    ctx.body = responseMessage(200, "OK", avatarPath);
  } catch (error) {
    throw error;
  }
};

const delAvatar = async (ctx, next) => {
  try {
    const { profile } = await _deleteAvatar(ctx.state.user);
    ctx.body = responseMessage(200, "OK", profile.avatarPath);
  } catch (error) {
    throw error;
  }
};

const setStatus = async (ctx, next) => {
  try {
    const { _id } = ctx.state.user;
    const { status } = ctx.request.body;
    const user = await User.findById(_id);

    user.profile.status = status ? status : "Сменить статус";
    const { profile } = await user.save();

    ctx.body = responseMessage(200, "OK", profile.status);
  } catch (error) {
    throw error;
  }
};

const _updateAvatar = async ({ _id }, { filename }) => {
  const filePath = path.join(publicPath, filename);
  const { profile } = await User.findByIdAndUpdate(
    _id,
    { $set: { "profile.avatarPath": filePath } },
    { new: true }
  );
  return profile;
};

const _deleteAvatar = async ({ _id }) => {
  const user = await User.findById(_id);
  const { profile } = user;

  await del([path.join("public", profile.avatarPath)]);
  profile.avatarPath = defaultAvatar;

  return await user.save();
};



module.exports = {
  addAvatar,
  delAvatar,
  setStatus
};
