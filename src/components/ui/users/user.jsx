import React, { useState, useEffect } from "react";
import { useRouteMatch, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Edit from "./edit";
import Card from "./card";

const User = ({ userId }) => {
    const [user, setUser] = useState();
    const { edit } = useParams();
    console.log(edit);
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

    const { url } = useRouteMatch();

    if (!user) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            <div className="row">
                <>
                    {edit === "edit" ? (
                        <Edit user={user} />
                    ) : (
                        <div className="col-6 offset-md-3 offset-lg-3">
                            <Card user={user} pathName={url} />
                        </div>
                    )}
                </>
            </div>
        </>
    );
};

User.propTypes = {
    userId: PropTypes.string.isRequired
};

export default User;
