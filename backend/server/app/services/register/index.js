const passport = require("passport");
const { User, validateUser, hashPassword } = require("../../model/user");

module.exports = async (req, username, password, done) => {
  try {
    const { email, username, password } = await validateUser(req.body);
    const hash = await hashPassword(password);
    const user = await new User({
      email,
      username,
      password: hash
    }).save();

    return done(null, user);
  } catch (error) {
    done(error);
  }
};
