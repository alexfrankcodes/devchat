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

    socket.broadcast.emit("message", {
      user: "admin",
      message: `${user.name} has joined the room!`,
    });

    socket.join(user.room);

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit("message", { user: user.name, text: message });

    callback();
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
