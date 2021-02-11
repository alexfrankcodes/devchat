import { emojify } from "react-emoji";

import styles from "../styles/Message.module.scss";

const Message: React.FC<{
  message: { user: string; text: string };
  name: string;
}> = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className={styles.messageContainerPrimary}>
      <p className={styles.userTextPrimary}>{name.trim()}</p>
      <div className={styles.messageBoxPrimary}>
        <p className={styles.messageTextPrimary}>{emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className={styles.messageContainerSecondary}>
      <div className={styles.messageBoxSecondary}>
        <p className={styles.messageTextSecondary}>{emojify(text)}</p>
      </div>
      <p className={styles.userTextSecondary}>{user}</p>
    </div>
  );
};

export default Message;
