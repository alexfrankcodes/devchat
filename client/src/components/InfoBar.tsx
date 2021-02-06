import closeIcon from "../icons/closeIcon.png";
import onlineIcon from "../icons/onlineIcon.png";

const InfoBar: React.FC<{ room: string }> = ({ room }) => {
  return (
    <div>
      <div className="infoBar">
        <div className="leftInnerContainer">
          <img className="onlineIcon" src={onlineIcon} alt="Online" />
          <h3>{room}</h3>
        </div>
        <div className="rightInnerContainer">
          <a href="/">
            <img src={closeIcon} alt="Close" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InfoBar;
