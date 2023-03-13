import React, { useContex, useEffect, useState } from "react";
import PropTypes from "prop-types";
import userService from "../service/user.service";
import { toast } from "react-toastify";
const UserContext = React.createContext();

export const useUserContext = () => {
    useContex(UserContext);
};

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState();

    useEffect(() => {
        async function fetchData() {
            const allUsers = await userService.fetchAll();
            console.log(allUsers);
            if (typeof allUsers !== "string") {
                const { data } = allUsers;
                setUsers(data.content);
            } else {
                toast.error(`Ошибка: ${allUsers}`);
            }
        }
        fetchData();
    }, []);

    return (
        <UserContext.Provider value={{ users }}>
            {children}
        </UserContext.Provider>
    );
};

UserProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default UserProvider;
