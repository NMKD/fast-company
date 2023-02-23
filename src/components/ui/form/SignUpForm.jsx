import React, { useState, useEffect } from "react";
import TextField from "./fields/textField";
import Select from "./fields/select";
import { validate } from "../../../utils/validate";
import { validationSchema } from "../../../utils/validationSchema";
import api from "../../../api";

const SignUpForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: ""
    });

    const [professions, setProfessions] = useState();
    const { email, password, profession } = data;
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length !== 0;

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleChangeData = ({ target }) => {
        const { name, value } = target;
        setData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    useEffect(() => {
        const errors = validate(data, validationSchema);
        setErrors(errors);
    }, [data]);

    useEffect(() => {
        async function fetchData() {
            try {
                const newProf = await api.professions.fetchAll();
                setProfessions(newProf);
            } catch (error) {
                throw new Error(
                    "error when mounting the component GroupList in Users"
                );
            }
        }
        fetchData();
    }, [professions]);

    return (
        <form className="g-3 needs-validation" onSubmit={handleSubmit}>
            <TextField
                label="Почта"
                name="email"
                value={email}
                onChange={handleChangeData}
                errors={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={password}
                onChange={handleChangeData}
                errors={errors.password}
            />
            <Select
                label="Выбрать профессию:"
                defaulOption="Choose..."
                options={professions}
                onChange={handleChangeData}
                name="profession"
                value={profession}
                error={errors.profession}
            />
            <button
                className="btn btn-success mt-3 mb-3"
                type="submit"
                disabled={isValid}
            >
                Отправить
            </button>
        </form>
    );
};

export default SignUpForm;
