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
const { generateInviteLink, checkInviteLink } = require("../app/services/chat/invitations");

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
    try {
      const { term } = ctx.query;
      const data = await getRooms(term);
      ctx.body = responseMessage(200, "", data);
    } catch (error) {
      throw error;
    }
  });
  router.get("/api/messages/:room_id", isAuthenticated, async ctx => {
    try {
      const messages = await getMessages(ctx.params, ctx.query);
      ctx.body = responseMessage(200, "", messages);
    } catch (error) {
      ctx.status = 403;
      throw error;
    }
  });
  router.post("/api/room/create", isAuthenticated, async ctx => {
    try {
      const { _id, name } = await createRoom(
        ctx.request.body,
        ctx.state.user._id
      );
      ctx.body = responseMessage(
        200,
        `room: ${_id} successfully created`,
        JSON.stringify({ _id, name })
      );
    } catch (error) {
      ctx.status = 403;
      throw error;
    }
  });
  router.delete("/api/room/delete/:id", isAuthenticated, async ctx => {
    try {
      const id_deletedRoom = await deleteRoom(
        ctx.params.id,
        ctx.state.user._id
      );
      ctx.body = responseMessage(
        200,
        `room: ${ctx.params.id} successfully deleted`,
        id_deletedRoom
      );
    } catch (error) {
      ctx.status = 403;
      throw error;
    }
  });
  router.put("/api/room/update/:id", isAuthenticated, async ctx => {
    try {
    } catch (error) {
      throw error;
    }
  });
  router.get("/api/invite/:room_id", isAuthenticated, async ctx => {
    try {
      const { invitation_id, room_name, invitationExpires } = await generateInviteLink(
        ctx.params.room_id,
        ctx.query.room_name,
        ctx.state.user._id
      );
      ctx.body = responseMessage(200, "", { invitation_id, room_name, invitationExpires });
    } catch (error) {
      ctx.status = 403;
      throw error;
    }
  });
  router.get("/api/check/:invitation_id", isAuthenticated, async ctx => {
    try {
      const socketManager = require("../app/services/chat/socket-connections")();
      const { invitation_id, room_name, room_id } = await checkInviteLink(
        ctx.params.invitation_id,
      );
      const room_online = socketManager.getConnection(room_id).length;
      ctx.body = responseMessage(200, "", { invitation_id, room_name, room_online, room_id });
    } catch (error) {
      ctx.status = 403;
      throw error;
    }
  })
};
