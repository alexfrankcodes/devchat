import { useState, useEffect } from "react";
import queryString from "query-string";
import { io, Socket } from "socket.io-client";

let socket: Socket;

const Chat = ({ location }: Window) => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const ENDPOINT = "localhost:5000";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    const checkedName: string = name?.toString() || "";
    const checkedRoom: string = room?.toString() || "";

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

  useEffect(() => {
    socket.on("message", (message: string) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event: React.KeyboardEvent) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => {
        setMessage("");
      });
    }
  };

  console.log(message, messages);

  return (
    <div>
      <div>
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) => event.key === "Enter" && sendMessage(event)}
          type="text"
        />
      </div>
    </div>
  );
};

export default Chat;
