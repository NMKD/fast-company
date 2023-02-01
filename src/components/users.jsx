import api from "../api";
import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) => {
    return setUsers((prevState) => prevState.filter((d) => d._id !== userId));
  };
  const renderPhrase = (number) => {
    return number !== 0 ? (
      <span>{`${number} человек тусанет с тобой сегодня`}</span>
    ) : (
      <span> Ни кто с тобой не тусанет</span>
    );
  };

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
