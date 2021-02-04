const users = [];

export const addUser = ({ id, name, room }) => {
  name = formatString(name);
  room = formatString(room);

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  const newUser = { id, name, room };

  users.push(newUser);

  return { newUser };
};

export const removeUser = (id: Number) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id: Number) => users.find((user) => user.id === id);

export const getUsersInRoom = (room: String) =>
  users.filter((user) => user.room === room);

const formatString = (inputString: String) => inputString.trim().toLowerCase();
