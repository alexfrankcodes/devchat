"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_io_1 = require("socket.io");
const http_1 = require("http");
const router_1 = __importDefault(require("./controllers/router"));
const PORT = process.env.PORT || 5000;
const app = express_1.default();
const httpServer = http_1.createServer(app);
const io = new socket_io_1.Server(httpServer);
app.use(router_1.default);
io.on("connection", (socket) => {
    socket.on("join", ({ name, room }, callback) => {
        console.log(name, room);
        const error = true;
        if (error) {
            callback({ error: "error" });
        }
    });
    socket.on("disconnect", () => {
        console.log("disconnected");
    });
});
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=index.js.map