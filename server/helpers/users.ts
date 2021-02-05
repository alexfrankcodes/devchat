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

export const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

export const getUser = (id: string) => users.find((user) => user.id === id);

export const getUsersInRoom = (room: string) =>
  users.filter((user) => user.room === room);

const formatString = (inputString: string) => inputString.trim().toLowerCase();
