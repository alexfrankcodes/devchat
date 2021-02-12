import { useState, useEffect } from "react";
import queryString from "query-string";
import { io, Socket } from "socket.io-client";

import InfoBar from "./InfoBar";
import Input from "./Input";
import Messages from "./Messages";
import UserList from "./UserList";

import styles from "../styles/Chat.module.scss";

let socket: Socket;

const Chat = ({ location }: Window) => {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);
  const [users, setUsers] = useState<string[]>([]);
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

    socket.on("roomData", ({ users }: any) => {
      setUsers(users);
      console.log(users);
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
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <InfoBar room={room} />
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <UserList users={users} />
    </div>
  );
};

export default Chat;
