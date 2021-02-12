"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const users_1 = require("./helpers/users");
const router_1 = __importDefault(require("./controllers/router"));
const PORT = process.env.PORT || 5000;
const app = express_1.default();
const httpServer = http_1.createServer(app);
const io = new socket_io_1.Server(httpServer);
app.use(router_1.default);
io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
        const { error, newUser: user } = users_1.addUser({ id: socket.id, name, room });
        if (error)
            return callback(error);
        socket.emit("message", {
            user: "admin",
            text: `Hello ${user.name}, welcome to ${user.room}!`,
        });
        socket.broadcast.to(user.room).emit("message", {
            user: "admin",
            text: `${user.name} has joined the room!`,
        });
        socket.join(user.room);
        io.to(user.room).emit("roomData", {
            room: user.room,
            users: users_1.getUsersInRoom(user.room),
        });
        callback();
    });
    socket.on("sendMessage", (message, callback) => {
        const user = users_1.getUser(socket.id);
        io.to(user.room).emit("message", { user: user.name, text: message });
        io.to(user.room).emit("roomData", {
            room: user.room,
            users: users_1.getUsersInRoom(user.room),
        });
        callback();
    });
    socket.on("disconnect", () => {
        const user = users_1.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit("message", {
                user: "admin",
                text: `${user.name} has left ${user.room}`,
            });
        }
    });
});
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map