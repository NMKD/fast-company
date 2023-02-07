import { useState } from "react";
import Users from "./components/User/users";
import api from "./api/index";
import SearchStatus from "./components/User/searchStatus";

const App = () => {
  const apiUsers = api.users.fetchAll();
  const tableHead = [
    "Имя",
    "Качество",
    "Профессия",
    "Встретился, раз",
    "Оценка",
    "Избранное",
  ];
  const [users, setUsers] = useState(apiUsers);
  const handleDelete = (userId) =>
    setUsers((prevState) => prevState.filter((d) => d._id !== userId));

  const handleToogleBookMark = (id) => {
    setUsers(
      users.map((user) => ({
        ...user,
        bookmark:
          user._id === id ? (user.bookmark = !user.bookmark) : user.bookmark,
      }))
    );
  };

  return (
    <div>
      <SearchStatus length={users.length} />
      {users.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              {tableHead.map((h) => (
                <th scope="col" key={h}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <Users
              users={users}
              onDelete={handleDelete}
              onToogle={handleToogleBookMark}
            />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default App;
