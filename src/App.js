import React, { useState } from "react";
import Users from "./components/User/users";
import api from "./api/index";

const App = () => {
    const [users, setUsers] = useState([]);

    async function fetchData() {
        try {
            const apiUsers = await api.users.fetchAll();
            setUsers(apiUsers);
        } catch (error) {
            throw new Error(
                "error when mounting the component App when fetchData to api/users"
            );
        }
    }

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

    useState(() => {
        fetchData();
    }, [users]);

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
