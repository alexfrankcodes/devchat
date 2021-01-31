import express from "express";
import { Server, Socket } from "socket.io";
import { createServer } from "http";

import router from "./controllers/router";

const PORT = process.env.PORT || 5000;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(router);

io.on("connection", (socket: Socket) => {
  console.log("new connection");

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
