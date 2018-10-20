const multer = require("koa-multer");
const path = require("path");
const del = require("del");
const { responseMessage } = require("../responseMessage");

const publicPath = path.join("img", "uploads");
const pathStore = path.join("public", "img", "uploads");
const allowedExt = [".png", ".jpg", ".gif", ".jpeg", ".svg"];

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, pathStore);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-m-img-${file.originalname}`);
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
}).single("message_img");

const uploadImg = async (ctx, next) => {
  try {
    const {
      req: { file }
    } = await upload(ctx);

    const filePath = path.join(publicPath, file.filename);
    ctx.body = responseMessage(200, "", { filePath });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  uploadImg
};
