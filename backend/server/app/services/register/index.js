const passport = require("passport");
const { User, validateUser, hashPassword } = require("../../model/user");
const { getIdGeneralRoom } = require("../chat");

module.exports = async (req, username, password, done) => {
  try {
    const idGeneralRoom = getIdGeneralRoom();
    const { email, username, password } = await validateUser(req.body);
    const hash = await hashPassword(password);
    const user = await new User({
      email,
      username,
      password: hash,
      rooms: [ {_id: idGeneralRoom, name: "General" }],
      active_room: idGeneralRoom,
    }).save();

    return done(null, user);
  } catch (error) {
    done(error);
  }
};
