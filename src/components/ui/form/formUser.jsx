import React, { useState, useEffect } from "react";
import api from "../../../api";
import TextField from "./fields/textField";
import PropTypes from "prop-types";
import SelectField from "./fields/selectField";
import MultiSelectField from "./fields/multiSelectField";
import RadioField from "./fields/radioField";

const FormUser = ({ user }) => {
    const [userSate, setUser] = useState(user);
    const [professions, setProfessions] = useState([]);
    const radioOptions = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Other", value: "other" }
    ];
    // const [data, setData] = useState({
    //     name: "",
    //     email: "",
    //     profession: "",
    //     sex: "male",
    //     qualities: []
    // });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(userSate);
    };

    const handleChangeData = (target) => {
        console.log(userSate);
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    useEffect(() => {
        async function fetchData() {
            try {
                const newProf = await api.professions.fetchAll();
                setProfessions(newProf);
            } catch (error) {
                throw new Error(
                    "error when mounting the component SignUpForm in ui/form"
                );
            }
        }
        fetchData();
    }, [professions]);

    return (
        <>
            <form className="needs-validation" onSubmit={handleSubmit}>
                <TextField
                    name="name"
                    value={userSate.name}
                    label="Имя"
                    onChange={handleChangeData}
                />
                <TextField
                    label="Почта"
                    name="email"
                    value={userSate.email}
                    onChange={handleChangeData}
                />
                <SelectField
                    label="Выбрать профессию:"
                    defaulOption="Choose..."
                    options={professions}
                    onChange={handleChangeData}
                    name="profession"
                    value={userSate.profession.name}
                />
                <RadioField
                    label="Выбрать пол: "
                    options={radioOptions}
                    name="sex"
                    value={userSate.sex}
                    onChange={handleChangeData}
                />
                <MultiSelectField
                    label="Выбрать качества:"
                    options={userSate.qualities}
                    name="qualities"
                    onChange={handleChangeData}
                    value={[]}
                />
            </form>
        </>
    );
};

FormUser.propTypes = {
    user: PropTypes.object
};

export default FormUser;