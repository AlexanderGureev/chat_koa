// const connection = {};

// const addRoom = id => {
//   connection[id] = {};
//   return connection[id];
// }
// const newConnection = socket => {
//   const { _id, active_room } = socket.user;
//   let room = connection[active_room];

//   if(!room) {
//     room = addRoom(active_room);
//   }

//   if (!room[_id]) {
//     room[_id] = socket.user;
//     room[_id].openConnections = 1;
//     return;
//   }
//   room[_id].openConnections++;
// };

// const deleteConnection = socket => {
//   const { _id, active_room } = socket.user;

//   if (connection[active_room][_id].openConnections > 1) {
//     connection[active_room][_id].openConnections--;
//   } else {
//     connection[active_room][_id] = null;
//   }
//   return getAllUserConnection(active_room);
// };

// const getAllUserConnection = active_room => {
//   const room = connection[active_room];
//   return room
//     ? Object.values(room)
//         .map(user => user)
//         .filter(user => user)
//     : [];
// };

// module.exports = {
//   newConnection,
//   getAllUserConnection,
//   deleteConnection
// };

class SocketConnection {
  constructor() {
    this.activeConnection = new Map();
  }

  get connection() {
    return this.activeConnection;
  }

  getRoom(id) {
    return this.activeConnection.get(id);
  }

  newConnection({ user }) {
    try {
      const user_id = user._id.toString();
      const room_id = user.active_room.toString();

      const addUser = room => {
        room.set(user_id, { ...user, openConnections: 1 });
      }

      const incConnectionUser = room => {
        const user = room.get(user_id);
        user.openConnections++;
      }
        
      const createRoom = () =>
        this.activeConnection.set(room_id, new Map()).get(room_id);

      const room = this.getRoom(room_id) || createRoom();

      return room.has(user_id) ? incConnectionUser(room) : addUser(room);
    } catch (err) {
      console.error(err);
    }
  }

  deleteConnection(socket) {
    try {
      const user_id = socket.user._id.toString();
      const room_id = socket.user.active_room.toString();

      const room = this.getRoom(room_id);
      const user = room.get(user_id);

      if (user.openConnections > 1) {
        user.openConnections--;
      } else {
        room.delete(user_id);
        if(!room.size) {
          this.activeConnection.delete(room_id);
        }
      }
      return [...room.values()];
    } catch (err) {
      console.error(err);
    }
  }

  getConnection(active_room) {
    const room_id = active_room.toString();
    const room = this.getRoom(room_id);
    if(room) {
      return [...room.values()];
    }
    return [];
  }
}

let instance;
module.exports = () => {
  if(instance) {
    return instance;
  } 
  instance = new SocketConnection();
  return instance;
};
