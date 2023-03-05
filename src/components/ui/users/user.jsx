import React, { useState, useEffect } from "react";
import { useRouteMatch, useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../../../api";
import Edit from "./edit";
import Card from "./card";

const User = ({ userId }) => {
    const { edit } = useParams();
    const [user, setUser] = useState({});
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
        if (user.qualities.find((item) => item._id)) {
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
        async function fetchData() {
            try {
                setProfessions(await api.professions.fetchAll());
            } catch (error) {
                throw new Error(
                    "error when mounting the component User in ui/users/user"
                );
            }
        }
        fetchData();
    }, [professions]);

    useEffect(() => {
        async function fetchData() {
            try {
                setQualities(await api.qualities.fetchAll());
            } catch (error) {
                throw new Error(
                    "error when mounting the component User in ui/users/user"
                );
            }
        }
        fetchData();
    }, [qualities]);

    useEffect(() => {
        async function fetchData() {
            try {
                const newUser = await api.users.getById(userId);
                setUser(newUser);
            } catch (error) {
                throw new Error(
                    "error when mounting the component User in ui/users/user"
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
