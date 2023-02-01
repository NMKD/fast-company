import api from "../api";
import { useState } from "react";

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const numbers = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44];
  const findNumber = (arr, value) => {
    let low = 0;
    let high = arr.length - 1;
    while (low <= high) {
      let mid = Math.round((low + high) / 2);
      let guess = arr[mid];
      console.log(high);
      if (guess === value) {
        return true;
      }
      if (guess > value) {
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }
    return false;
  };
  const handleDelete = (userId) =>
    setUsers((prevState) => prevState.filter((d) => d._id !== userId));

  const renderPhrase = (number) => {
    return findNumber(numbers, number)
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
