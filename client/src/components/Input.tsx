import styles from "../styles/Input.module.scss";

const Input: React.FC<{
  message: string;
  setMessage: Function;
  sendMessage: Function;
}> = ({ message, setMessage, sendMessage }) => {
  return (
    <form className={styles.form} action="">
      <input
        className={styles.input}
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        onKeyPress={(event) => event.key === "Enter" && sendMessage(event)}
      />
      <button
        className={styles.sendButton}
        onClick={(event) => sendMessage(event)}
      >
        Send
      </button>
    </form>
  );
};

export default Input;
