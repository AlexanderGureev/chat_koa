const passport = require("passport");
const { User, validateUser, hashPassword } = require("../../model/user");

module.exports = async (req, username, password, done) => {
  try {
    const { email, username, password } = await validateUser(req.body);
    let user = await User.findOne({ email });
    const hash = await hashPassword(password);
    user = await new User({
      email,
      username,
      password: hash
    }).save();

    return done(null, user);

  } catch (error) {
    console.error(error);
    done(error);
  }
};
