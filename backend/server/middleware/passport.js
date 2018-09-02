const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const registerService = require("../app/services/register");
const { User } = require("../app/model/user");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

const passportInit = () => {
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      registerService
    )
  );
};

module.exports = {
  passportInit
};
