import api from "../api";
import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());

  const handleDelete = (userId) =>
    setUsers((prevState) => prevState.filter((d) => d._id !== userId));

  const renderPhrase = (number) => {
    let num = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44].includes(number);
    return num
      ? `${number} человека тусанут с тобой сегодня`
      : `${number} человек тусанет с тобой сегодня`;
  };

  return (
    <>
      <button
        className={
          "btn m-2 " + (users.length === 0 ? "btn-danger" : "btn-primary")
        }
      >
        {users.length > 0
          ? renderPhrase(users.length)
          : "Никто с тобой не тусанет"}
      </button>
      {users.length > 0 && (
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
      )}
    </>
  );
};

export default Users;
