import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

import { addUser, removeUser, getUser, getUsersInRoom } from "./helpers/users";

import router from "./controllers/router";

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(router);

io.on("connection", (socket: Socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { error, newUser: user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

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
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left ${user.room}`,
      });
    }
  });
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
