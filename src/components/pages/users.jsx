import React from "react";
import { useParams } from "react-router-dom";
import User from "../ui/users/user";
import UsersList from "../ui/users/usersList";

const Users = () => {
    const params = useParams();
    const { id } = params;
    return <>{id ? <User id={id} /> : <UsersList />}</>;
};

export default Users;
