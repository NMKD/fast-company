import React, { useState, useEffect } from "react";
import { useRouteMatch, Route } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Edit from "./edit";
import Card from "./card";

const User = ({ userId }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        async function fetchData() {
            try {
                const apiUser = await api.users.getById(userId);
                setUser(apiUser);
            } catch (error) {
                throw new Error(
                    "error when mounting the component User when fetchData to api/users"
                );
            }
        }
        fetchData();
    }, []);

    const { path, url } = useRouteMatch();

    if (!user) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            <div className="row">
                <div className="col-6 offset-md-3 offset-lg-3">
                    <Card user={user} pathName={url} />
                </div>
                <Route path={`${path}/:edit`}>
                    <Edit user={user} />
                </Route>
            </div>
        </>
    );
};

User.propTypes = {
    userId: PropTypes.string.isRequired
};

export default User;
