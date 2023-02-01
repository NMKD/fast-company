import api from "../api";
import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) =>
    setUsers((prevState) => prevState.filter((d) => d._id !== userId));

  const renderPhrase = (number) =>
    number === 2 || number === 3 || number === 4
      ? number + " человека тусанут с тобой"
      : number + " человек тусанет с тобой";

  return (
    <>
      <button
        type="button"
        className={
          users.length === 0 ? "btn btn-danger m-2" : "btn btn-primary m-2"
        }
      >
        {renderPhrase(users.length)}
      </button>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качество</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился, раз</th>
            <th scope="col">Оценка</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>
                {user.qualities.map((q) => (
                  <span key={q.color} className={`m-2 badge bg-${q.color}`}>
                    {q.name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}/5</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
