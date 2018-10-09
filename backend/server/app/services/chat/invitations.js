const randomize = require("randomatic");
const Invitation = require("../../model/invitations");

const generateInviteLink = async (room_id, user_id) => {
  let invitation = await Invitation.findOne({
    user_id,
    room_id,
    invitationExpires: {
      $gt: Date.now()
    }
  });

  if (invitation) {
    return invitation;
  }

  const invitationExpires = Date.now() + 1440 * 1000 * 60;
  const invitation_id = randomize("Aa0", 6);

  invitation = new Invitation({
    user_id,
    room_id,
    invitation_id,
    invitationExpires
  });
  return await invitation.save();
};

const checkInviteLink = async invitation_id => {
  let invitation = await Invitation.findOne({
    invitation_id,
    invitationExpires: {
      $gt: Date.now()
    }
  });

  if (invitation) {
    return invitation;
  }
  throw new Error("Данное приглашение не действительно.");
};

module.exports = {
  generateInviteLink,
  checkInviteLink
};
