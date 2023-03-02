/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import TextField from "./fields/textField";
import PropTypes from "prop-types";
import SelectField from "./fields/selectField";
import MultiSelectField from "./fields/multiSelectField";
import RadioField from "./fields/radioField";
import { validationSchema } from "../../../utils/validationSchema";
import { validate } from "../../../utils/validate";

const FormUser = ({
    user,
    onSubmit,
    onChange,
    radioOptions,
    qualities,
    professions
}) => {
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length !== 0;

    const { email, name, profession } = user;
    const data = { email, name, profession };
    useEffect(() => {
        const errors = validate(data, validationSchema);
        setErrors(errors);
    }, [user]);

    return (
        <>
            {user ? (
                <form className="needs-validation" onSubmit={onSubmit}>
                    <TextField
                        name="name"
                        value={user.name}
                        label="Имя"
                        onChange={onChange}
                        errors={errors.name}
                    />
                    <TextField
                        label="Почта"
                        name="email"
                        value={user.email}
                        onChange={onChange}
                        errors={errors.email}
                    />
                    <SelectField
                        label="Выбрать профессию:"
                        defaulOption="Choose..."
                        options={professions}
                        onChange={onChange}
                        name="profession"
                        value={user.profession}
                        errors={errors.profession}
                    />
                    <RadioField
                        label="Выбрать пол: "
                        options={radioOptions}
                        name="sex"
                        value={user.sex}
                        onChange={onChange}
                    />
                    <MultiSelectField
                        label="Выбрать качества:"
                        options={qualities}
                        name="qualities"
                        onChange={onChange}
                        defaultValue={user.qualities}
                    />
                    <button
                        className="btn btn-success mt-3 mb-3"
                        type="submit"
                        disabled={isValid}
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
    user: PropTypes.object,
    onSubmit: PropTypes.func,
    onChange: PropTypes.func,
    radioOptions: PropTypes.array,
    professions: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    qualities: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
};

export default FormUser;
