import styles from "../styles/UserList.module.scss";

const UserList: React.FC<{ users: any }> = ({ users }) => {
  return (
    <div className={styles.container}>
      <h2>Users</h2>
      {users.map((user: any) => (
        <p key={user.name}>{user.name}</p>
      ))}
    </div>
  );
};

export default UserList;
