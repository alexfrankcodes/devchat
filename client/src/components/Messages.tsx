import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

import styles from "../styles/Messages.module.scss";

const Messages: React.FC<{
  messages: Object[];
  name: string;
}> = ({ messages, name }) => {
  return (
    <ScrollToBottom className={styles.container}>
      {messages.map((message: any, index: number) => (
        <div key={index}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
