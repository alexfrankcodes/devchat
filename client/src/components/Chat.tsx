import { useState, useEffect } from "react";
import queryString from "query-string";
import { io, Socket } from "socket.io-client";

let socket: Socket;

const Chat = ({ location }: Window) => {
  const [name, setName] = useState<String>("");
  const [room, setRoom] = useState<String>("");
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    const checkedName: String = name?.toString() || "";
    const checkedRoom: String = room?.toString() || "";

    setName(checkedName);
    setRoom(checkedRoom);

    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.emit("join", { name, room }, () => {});

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, location.search]);

  return <h1>Chat</h1>;
};

export default Chat;
