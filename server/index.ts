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
    console.log(name, room);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
