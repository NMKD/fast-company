import React, { useState, useEffect } from "react";
import TextField from "./fields/textField";
import SelectField from "./fields/selectField";
import RadioField from "./fields/radioField";
import MultiSelectField from "./fields/multiSelectField";
import { validate } from "../../../utils/validate";
import { validationSchema } from "../../../utils/validationSchema";
import api from "../../../api";
import CheckBoxField from "./fields/checkBoxField";

const SignUpForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: true
    });

    const [professions, setProfessions] = useState([]);
    const [qualities, setQualities] = useState({});
    const { email, password, profession, sex, licence } = data;
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length !== 0;
    const radioOptions = [
        { name: "Male", value: "male" },
        { name: "Female", value: "female" },
        { name: "Other", value: "other" }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
    };

    const handleChangeData = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
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
                    "error when mounting the component SignUpForm in ui/form"
                );
            }
        }
        fetchData();
    }, [professions]);

    useEffect(() => {
        async function fetchData() {
            try {
                const newQua = await api.qualities.fetchAll();
                setQualities(newQua);
            } catch (error) {
                throw new Error(
                    "error when mounting the component SignUpForm in ui/form"
                );
            }
        }
        fetchData();
    }, [qualities]);

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
            <SelectField
                label="Выбрать профессию:"
                defaulOption="Choose..."
                options={professions}
                onChange={handleChangeData}
                name="profession"
                value={profession}
                error={errors.profession}
            />
            <MultiSelectField
                label="Выбрать качества:"
                options={qualities}
                name="qualities"
                onChange={handleChangeData}
            />
            <RadioField
                label="Выбрать пол: "
                options={radioOptions}
                name="sex"
                value={sex}
                onChange={handleChangeData}
            />

            <button
                className="btn btn-success mt-3 mb-3"
                type="submit"
                disabled={isValid}
            >
                Отправить
            </button>

            <CheckBoxField
                value={licence}
                onChange={handleChangeData}
                name="licence"
                errors={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
        </form>
    );
};

export default SignUpForm;
