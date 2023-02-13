import React from "react";
import User from "./user";
import PropTypes from "prop-types";
const Users = ({ users, onDelete, onToogle }) => {
    return (
        <>
            {users.map((user) => (
                <User
                    key={user._id}
                    {...user}
                    remove={onDelete}
                    onToogle={onToogle}
                />
            ))}
        </>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToogle: PropTypes.func.isRequired
};

export default Users;
