import User from "./user";
const Users = ({ users, onDelete, onToogle }) => {
  return (
    <>
      {users.map((user) => (
        <User key={user._id} {...user} remove={onDelete} onToogle={onToogle} />
      ))}
    </>
  );
};

export default Users;
