const passport = require("passport");
const { User, checkPassword } = require("../../model/user");

module.exports = async (req, username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("Пользователя с таким именем не существует.");
    }
    const isEqual = await checkPassword(password , user.password);
    if(isEqual) {
      return done(null, user);
    } else {
      throw new Error("Неверный пароль.")
    }

  } catch (error) {
    done(error);
  }
};