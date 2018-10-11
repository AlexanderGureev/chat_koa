const mongoose = require("mongoose");

mongoose.set("useCreateIndex", true);
mongoose.set("useFindAndModify", false);
const { Schema } = mongoose;

const invitationsSchema = Schema({
  user_id: Schema.Types.ObjectId,
  room_id: Schema.Types.ObjectId,
  room_name: String,
  invitation_id: String,
  invitationExpires: Date,
});

const Invitation = mongoose.model("invitations", invitationsSchema);

module.exports = Invitation;
