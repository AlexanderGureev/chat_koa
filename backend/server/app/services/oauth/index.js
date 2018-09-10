const passport = require("koa-passport");
const { User } = require("../../model/user");
const TokenModel = require("../../model/authToken");
const { vkApi } = require("../socialApi");
const path = require("path");

const createUser = async ({ id, provider, displayName, email, photos }) => {
  const user = new User({
    [`${provider}Id`]: id,
    provider,
    username: displayName,
    email,
    "profile.avatarPath": photos
  });

  return await user.save();
};
const createToken = async (id, accessToken, refreshToken) => {
  const token = new TokenModel({
    _id: id,
    access_token: accessToken,
    refresh_token: refreshToken,
    created: Date.now()
  });

  return await token.save();
};

const googleRegister = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({
      googleId: profile.id
    });

    if (user) {
      return done(null, user);
    }

    const profileUser = {
      ...profile,
      email: profile.emails[0].value,
      photos: profile.photos[0].value.split("?sz=50")[0] + "?sz=250"
    };

    user = await createUser(profileUser);
    await createToken(user.id, accessToken, refreshToken);

    return done(null, user);
  } catch (error) {
    done(error);
  }
};

const vkRegister = async (accessToken, refreshToken, params, profile, done) => {
  try {
    let user = await User.findOne({
      vkontakteId: profile.id
    });

    if (user) {
      return done(null, user);
    }

    const [userDetails] = await vkApi(
      "users.get",
      `user_ids=${profile.id}&fields=photo_200`,
      accessToken
    );

    const profileUser = {
      ...profile,
      email: params.email,
      photos: userDetails.photo_200
    };

    user = await createUser(profileUser);
    await createToken(user.id, accessToken, refreshToken);

    return done(null, user);
  } catch (error) {
    done(error);
  }
};

const twitterRegister = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({
      twitterId: profile.id
    });

    if (user) {
      return done(null, user);
    }

    const profileUser = {
      ...profile,
      email: profile._json.email,
      photos:
        profile._json.profile_image_url_https.split("_normal")[0] +
        path.extname(profile._json.profile_image_url_https)
    };

    user = await createUser(profileUser);
    await createToken(user.id, accessToken, refreshToken);

    return done(null, user);
  } catch (error) {
    done(error);
  }
};

module.exports = {
  googleRegister,
  vkRegister,
  twitterRegister
};
