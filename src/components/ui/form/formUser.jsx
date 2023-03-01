/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import api from "../../../api";
import TextField from "./fields/textField";
import PropTypes from "prop-types";
import SelectField from "./fields/selectField";
import MultiSelectField from "./fields/multiSelectField";
import RadioField from "./fields/radioField";
// import { validationSchema } from "../../../utils/validationSchema";
// import { validate } from "../../../utils/validate";

const FormUser = ({ user }) => {
    const history = useHistory();
    const [userState, setUser] = useState(user);
    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});
    const [isLoading, setLoad] = useState(false);
    // const [errors, setErrors] = useState({});
    // const isValid = Object.keys(errors).length !== 0;

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
        userState.qualities.forEach((item) =>
            Object.keys(qualities).forEach((opt) => {
                if (qualities[opt]._id === item.value) {
                    arrayQualities.push(qualities[opt]);
                }
            })
        );
        return arrayQualities;
    };

    const verificationProf = (name) => {
        console.log(name);
        if (typeof name === "object") {
            return name;
        }
        return getProfession(name);
    };

    const verificationQual = (qualities) => {
        if (userState.qualities.find((item) => item._id)) {
            return userState.qualities;
        }
        return getQualities(qualities);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoad(true);
        api.users
            .update(user._id, {
                ...userState,
                profession: verificationProf(userState.profession),
                qualities: verificationQual(qualities)
            })
            .then((data) => history.push(`/users/${data._id}`))
            .then(() => setLoad(false));
    };

    const handleChangeData = (target) => {
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // useEffect(() => {
    //     const errors = validate(userState, validationSchema);
    //     setErrors(errors);
    // }, [userState]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoad(true);
                setProfessions(await api.professions.fetchAll());
                setLoad(false);
            } catch (error) {
                throw new Error(
                    "error when mounting the component SignUpForm in ui/form"
                );
            }
        }
        fetchData();
    }, [professions]);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoad(true);
                setQualities(await api.qualities.fetchAll());
                setLoad(false);
            } catch (error) {
                throw new Error(
                    "error when mounting the component SignUpForm in ui/form"
                );
            }
        }
        fetchData();
    }, [qualities]);

    return (
        <>
            {!isLoading ? (
                <form className="needs-validation" onSubmit={handleSubmit}>
                    <TextField
                        name="name"
                        value={userState.name}
                        label="Имя"
                        onChange={handleChangeData}
                    />
                    <TextField
                        label="Почта"
                        name="email"
                        value={userState.email}
                        onChange={handleChangeData}
                    />
                    <SelectField
                        label="Выбрать профессию:"
                        defaulOption="Choose..."
                        options={professions}
                        onChange={handleChangeData}
                        name="profession"
                        value={userState.profession}
                    />
                    <RadioField
                        label="Выбрать пол: "
                        options={radioOptions}
                        name="sex"
                        value={userState.sex}
                        onChange={handleChangeData}
                    />
                    <MultiSelectField
                        label="Выбрать качества:"
                        options={qualities}
                        name="qualities"
                        onChange={handleChangeData}
                        defaultValue={userState.qualities}
                    />
                    <button
                        className="btn btn-success mt-3 mb-3"
                        type="submit"
                        // disabled={isValid}
                    >
                        Отправить
                    </button>
                </form>
            ) : (
                <h1>Loading...</h1>
            )}
        </>
    );
};

FormUser.propTypes = {
    user: PropTypes.object
};

export default FormUser;
