import React, { useState } from "react";
import Users from "./components/User/users";
import api from "./api/index";
import SearchStatus from "./components/User/searchStatus";
import Pagination from "./components/User/pagination";
import paginate from "../src/utils/paginate";

const App = () => {
    const apiUsers = api.users.fetchAll();
    const tableHead = [
        "Имя",
        "Качество",
        "Профессия",
        "Встретился, раз",
        "Оценка",
        "Избранное"
    ];
    const [users, setUsers] = useState(apiUsers);
    const count = users.length;
    const handleDelete = (userId) =>
        setUsers((prevState) => prevState.filter((d) => d._id !== userId));

    const handleToogleBookMark = (id) => {
        setUsers(
            users.map((user) => ({
                ...user,
                bookmark:
                    user._id === id
                        ? (user.bookmark = !user.bookmark)
                        : user.bookmark
            }))
        );
    };

    // Pagination
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (i) => {
        setCurrentPage(i);
    };
    const usersCrop = paginate(users, currentPage, pageSize);

    return (
        <div className="p-3">
            <SearchStatus length={count} />
            {count > 0 && (
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
                            users={usersCrop}
                            onDelete={handleDelete}
                            onToogle={handleToogleBookMark}
                        />
                    </tbody>
                </table>
            )}
            <Pagination
                itemsCount={count}
                pageSize={pageSize}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default App;
