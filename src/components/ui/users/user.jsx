import React, { useState, useEffect } from "react";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Edit from "./edit";
import Card from "./card";
import QualitieList from "./qualities/qualitieList";
import CompletedMeetings from "./completedMeetings";
import Comments from "../comments/comments";

const User = ({ userId }) => {
    const { edit } = useParams();
    const [user, setUser] = useState();
    const fromUser = user ? { ...user, profession: user.profession.name } : {};
    const history = useHistory();
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});

    const radioOptions = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Other", value: "other" }
    ];

    const getProfession = (name) => {
        const i = professions.findIndex(
            (prof) => prof.name.toLowerCase() === name.toLowerCase()
        );
        return professions[i];
    };

    const getQualities = (qualities) => {
        const arrayQualities = [];
        fromUser.qualities.forEach((item) =>
            Object.keys(qualities).forEach((opt) => {
                if (qualities[opt]._id === item.value) {
                    arrayQualities.push(qualities[opt]);
                }
            })
        );
        return arrayQualities;
    };

    const verificationProf = (name) => {
        if (typeof name === "object") {
            return name;
        }
        return getProfession(name);
    };

    const verificationQual = (qualities) => {
        if (user.qualities.filter((item) => item._id)) {
            return user.qualities;
        }
        return getQualities(qualities);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.users
            .update(user._id, {
                ...fromUser,
                profession: verificationProf(user.profession),
                qualities: verificationQual(qualities)
            })
            .then((data) => setUser(data))
            .then(() => history.push(`/users/${user._id}`));
    };

    const handleChangeData = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    useEffect(() => {
        console.log("fetch to api/users");
        async function fetchData() {
            try {
                setUser(await api.users.getById(userId));
                setProfessions(await api.professions.fetchAll());
                setQualities(await api.qualities.fetchAll());
            } catch (error) {
                throw new Error(
                    "error when mounting the component User in ui/users/user, check the server requests to api/users"
                );
            }
        }
        fetchData();
    }, []);

    const { url } = useRouteMatch();

    if (!user) {
        return (
            <div className="container">
                <div className="row">
                    <h2>Loading...</h2>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container">
                <div className="row">
                    <>
                        {edit === "edit" ? (
                            <Edit
                                onSubmit={handleSubmit}
                                onChange={handleChangeData}
                                {...{
                                    radioOptions,
                                    professions,
                                    qualities,
                                    user: fromUser
                                }}
                            />
                        ) : (
                            <>
                                <div className="col-12 col-md-4 col-lg-4">
                                    <Card user={user} pathName={url} />
                                    <QualitieList
                                        qualities={fromUser.qualities}
                                    />
                                    <CompletedMeetings
                                        completedMeetings={
                                            fromUser.completedMeetings
                                        }
                                    />
                                </div>
                                <div className="col-12 col-md-8 col-lg-8">
                                    <Comments {...{ userId }} />
                                </div>
                            </>
                        )}
                    </>
                </div>
            </div>
        </>
    );
};

User.propTypes = {
    userId: PropTypes.string.isRequired
};

export default User;
