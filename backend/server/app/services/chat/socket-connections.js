const connection = {};

const newConnection = socket => {
  const { _id } = socket.user;

  if (!connection[_id]) {
    connection[_id] = socket.user;
    connection[_id].openConnections = 1;
    return;
  }
  connection[_id].openConnections++;
};

const deleteConnection = socket => {
  const { _id } = socket.user;

  if (connection[_id].openConnections > 1) {
    connection[_id].openConnections--;
  } else {
    connection[_id] = null;
  }
  return getAllUserConnection();
};

const getAllUserConnection = () =>
  Object.values(connection)
        .map(user => user)
        .filter(user => user);

module.exports = {
  newConnection,
  getAllUserConnection,
  deleteConnection
};
