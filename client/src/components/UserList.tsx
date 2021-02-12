const UserList: React.FC<{ users: any }> = ({ users }) => {
  return (
    <div>
      <h2>Users</h2>
      {users.map((user: any) => (
        <p key={user.name}>{user.name}</p>
      ))}
    </div>
  );
};

export default UserList;
