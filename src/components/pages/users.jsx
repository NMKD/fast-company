import React from "react";
import { useParams } from "react-router-dom";
import User from "../User/user";
import UsersList from "../User/usersList";

const Users = () => {
    const params = useParams();
    const { id } = params;
    return <>{id ? <User id={id} /> : <UsersList />}</>;
};

export default Users;
