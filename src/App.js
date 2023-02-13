import React, { useState } from "react";
import Users from "./components/User/users";
import api from "./api/index";

const App = () => {
    const apiUsers = api.users.fetchAll();
    const [users, setUsers] = useState(apiUsers);
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

    return (
        <>
            <Users
                users={users}
                onDelete={handleDelete}
                onToogle={handleToogleBookMark}
            />
        </>
    );
};

export default App;
