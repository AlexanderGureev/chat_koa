const { isAuthenticated } = require("../middleware/isAuth");
const { User } = require("../app/model/user");
const { getMessages } = require("../app/services/chat/getMessages");
const { responseMessage } = require("../app/services/responseMessage");
const {
  createRoom,
  deleteRoom,
  updateRoom,
  getRooms
} = require("../app/services/chat/rooms");

module.exports = router => {
  router.get("/api/token", async ctx => {
    ctx.body = { token: ctx.csrf };
  });
  router.get("/api/isAuthenticated", async ctx => {
    ctx.body = { isAuth: ctx.isAuthenticated() };
  });
  router.get("/api/user/profile", isAuthenticated, async ctx => {
    try {
      const {
        profile: { status, avatarPath },
        email,
        username,
        provider
      } = await User.findById(ctx.state.user._id);
      ctx.body = {
        status,
        avatarPath,
        email,
        username,
        provider
      };
    } catch (error) {
      throw error;
    }
  });
  router.get("/api/rooms", isAuthenticated, async ctx => {
    const { term } = ctx.query;
    const data = await getRooms(term);
    ctx.body = responseMessage(200, "", data);
  });

  router.get("/api/messages/:room_id", isAuthenticated, async ctx => {
    const messages = await getMessages(ctx.params, ctx.query);
    ctx.body = responseMessage(200, "", messages);
  });

  router.post("/api/room/create", isAuthenticated, async ctx => {
    const { _id, name, public, room_author } = await createRoom(
      ctx.request.body,
      ctx.state.user._id
    );
    ctx.body = responseMessage(
      200,
      `room: ${_id} successfully created`,
      JSON.stringify({ _id, name, public, room_author })
    );
  });
  router.delete("/api/room/delete/:id", isAuthenticated, async ctx => {
    const id_deletedRoom = await deleteRoom(ctx.params.id, ctx.state.user._id);
    ctx.body = responseMessage(
      200,
      `room: ${ctx.params.id} successfully deleted`,
      id_deletedRoom
    );
  });
  router.put("/api/room/update/:id", isAuthenticated, async ctx => {
    console.log(ctx.params);
  });
};
