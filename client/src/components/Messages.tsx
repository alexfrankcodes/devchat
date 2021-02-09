import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message";

const Messages: React.FC<{
  messages: Object[];
  name: string;
}> = ({ messages, name }) => {
  return (
    <ScrollToBottom>
      {messages.map((message: any, index: number) => (
        <div key={index}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
