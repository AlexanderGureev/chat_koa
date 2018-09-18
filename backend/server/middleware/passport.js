const passport = require("koa-passport");
const LocalStrategy = require("passport-local").Strategy;
const registerService = require("../app/services/register");
const authService = require("../app/services/auth");
const { User } = require("../app/model/user");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const VKStrategy = require("passport-vkontakte").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const { env } = require("../config");
const {
  googleRegister,
  vkRegister,
  twitterRegister
} = require("../app/services/oauth");

const propName = env === "production" ? "oauth" : "dev_oauth";
const {
  [propName]: { google, vk, twitter }
} = require("../config");

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
  passport.use(
    "auth",
    new LocalStrategy(
      {
        passReqToCallback: true
      },
      authService
    )
  );

  passport.use(
    "google",
    new GoogleStrategy(
      {
        clientID: google.clientId,
        clientSecret: google.clientSecret,
        callbackURL: google.callbackURL,
        state: true
      },
      googleRegister
    )
  );

  passport.use(
    "vkontakte",
    new VKStrategy(
      {
        clientID: vk.clientId,
        clientSecret: vk.clientSecret,
        callbackURL: vk.callbackURL,
        state: true
      },
      vkRegister
    )
  );

  passport.use(
    "twitter",
    new TwitterStrategy(
      {
        consumerKey: twitter.consumerKey,
        consumerSecret: twitter.consumerSecret,
        callbackURL: twitter.callbackURL,
        includeEmail: true,
        state: true
      },
      twitterRegister
    )
  );
};

module.exports = {
  passportInit
};
