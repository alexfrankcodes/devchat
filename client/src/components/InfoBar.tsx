import closeIcon from "../icons/closeIcon.png";
import styles from "../styles/InfoBar.module.scss";

const InfoBar: React.FC<{ room: string }> = ({ room }) => {
  return (
    <div>
      <div className={styles.outerContainer}>
        <div className={styles.leftInnerContainer}>
          <h1>{room}</h1>
        </div>
        <div className={styles.rightInnerContainer}>
          <a href="/">
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
