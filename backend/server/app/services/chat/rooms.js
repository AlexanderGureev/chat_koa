const { Rooms, validateRooms } = require("../../model/rooms");
const { User } = require("../../model/user");

const createRoom = async (room, user_id) => {
  try {
    await validateRooms(room);
    let newRoom = new Rooms(room);
    newRoom = await newRoom.save();
    const user = await User.findById(user_id);
    user.rooms.push({
      _id: newRoom._id,
      name: newRoom.name
    });
    await user.save();
    return newRoom;
  } catch (error) {
    throw error;
  }
};

const deleteRoom = async (id, user_id) => {
  try {
    const room = await Rooms.findById(id);
    if (!room) {
      throw new Error("Комнаты с таким id не существует.");
    }
    if (room.room_author.toString() !== user_id.toString()) {
      let user = await User.findById(user_id);
      user.rooms = user.rooms.filter(({ _id }) => _id !== id);
      return id;
    }
    await Rooms.deleteOne({ _id: id });
    let user = await User.findById(user_id);
    user.rooms = user.rooms.filter(({ _id }) => _id.toString() !== id.toString());
    await user.save();
    return id;
  } catch (error) {
    throw error;
  }
};

const updateRoom = async data => {};
module.exports = {
  createRoom,
  deleteRoom,
  updateRoom
};
