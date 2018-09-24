const { isAuthenticated } = require("../middleware/isAuth");

const { Rooms, validateRooms } = require("../app/model/rooms");
const { User } = require("../app/model/user");

const createGeneralRoom = async (ctx, next) => {
  try {
    const { _id, username } = ctx.state.user;
    await validateRooms({name: "general", room_author: _id});
    const rooms = new Rooms({
      messages: [
        {
          user_id: _id,
          text: "test test",
          status: "created"
        },
        {
          user_id: _id,
          text: "test test 2",
          status: "created"
        },
        {
          user_id: _id,
          text: "test test 3",
          status: "created"
        }
      ],
      public: true,
      room_author: _id
    });
    const room = await rooms.save();
    console.log(room);
    let user = await User.findById(_id);
    user.rooms.push({
      id: room._id,
      read_messages: 0,
      join_date: Date.now()
    });
    user.active_room = room._id;
    user = await user.save();
    console.log(user);
    await next();
  } catch (error) {
    console.log(error);
    return;
  }
};

module.exports = router => {
  router.get("/chat", isAuthenticated, async (ctx, next) => {
    await ctx.render("chat");
  });
};
