import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../api";
import Qualitie from "./qualitie";

const User = ({ id }) => {
    const [user, setUser] = useState();
    useEffect(() => {
        async function fetchData() {
            try {
                const apiUser = await api.users.getById(id);
                setUser(apiUser);
            } catch (error) {
                throw new Error(
                    "error when mounting the component User when fetchData to api/users"
                );
            }
        }
        fetchData();
    }, [user]);

    const history = useHistory();
    const handleSave = () => {
        history.push("/users");
    };
    if (!user) {
        return <h1>Loading...</h1>;
    }
    return (
        <>
            <div className="row">
                <div className="col-12 col-md-6 col-lg-4 p-3">
                    <div className="card m-2">
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">
                                Профессия: {user.profession.name}
                            </h6>
                            {user.qualities.map((q) => (
                                <Qualitie
                                    key={q.name}
                                    color={q.color}
                                    name={q.name}
                                />
                            ))}
                            <p className="card-text">Rate: {user.rate}</p>
                            <p className="card-text">
                                completedMeetings: {user.completedMeetings}
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={() => handleSave()}
                            >
                                Back to users
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

User.propTypes = {
    id: PropTypes.string.isRequired
};

export default User;
