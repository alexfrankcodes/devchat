import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "../styles/Join.module.scss";

const Join = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <h1>DevChat</h1>
        <p>
          Welcome to DevChat! <br />
          Please enter your display name and which room you would like to join.
        </p>
        <div>
          <input
            placeholder="Username"
            type="text"
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Room name"
            type="text"
            onChange={(event) => setRoom(event.target.value)}
          />
        </div>
        <Link
          onClick={(event) => (!name || !room ? event.preventDefault() : null)}
          to={`/chat?name=${name}&room=${room}`}
        >
          <button className="button" type="submit">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
