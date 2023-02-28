import React from "react";
import PropTypes from "prop-types";
import Qualitie from "../qualities/qualitie";
import { Link } from "react-router-dom";

const CardUser = ({ user, pathName }) => {
    return (
        <>
            {user ? (
                <div className="card m-2 shadow">
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
                        <Link
                            className="btn btn-primary"
                            to={`${pathName}/edit`}
                        >
                            Изменить
                        </Link>
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

CardUser.propTypes = {
    user: PropTypes.object,
    pathName: PropTypes.string
};

export default CardUser;
