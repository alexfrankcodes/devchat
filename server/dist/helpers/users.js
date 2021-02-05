"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersInRoom = exports.getUser = exports.removeUser = exports.addUser = void 0;
const users = [];
const addUser = ({ id, name, room }) => {
    name = formatString(name);
    room = formatString(room);
    const existingUser = users.find((user) => user.room === room && user.name === name);
    if (existingUser) {
        return { error: "Username is taken" };
    }
    const newUser = { id, name, room };
    users.push(newUser);
    return { newUser };
};
exports.addUser = addUser;
const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};
exports.removeUser = removeUser;
const getUser = (id) => users.find((user) => user.id === id);
exports.getUser = getUser;
const getUsersInRoom = (room) => users.filter((user) => user.room === room);
exports.getUsersInRoom = getUsersInRoom;
const formatString = (inputString) => inputString.trim().toLowerCase();
//# sourceMappingURL=users.js.map