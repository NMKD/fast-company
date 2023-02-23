import React, { useState, useEffect } from "react";
import TextField from "../../common/form/fields/textField";
import { validate } from "../../../utils/validate";
import { validationSchema } from "../../../utils/validationSchema";

const SingInForm = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const { email, password } = data;
    const [errors, setErrors] = useState({});
    const isValid = Object.keys(errors).length !== 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(data);
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

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col col-md-6 col-lg-6 offset-md-3 offset-lg-3 shadow p-5">
                    <h3 className="text-center">SingIn</h3>
                    <form
                        className="g-3 needs-validation"
                        onSubmit={handleSubmit}
                    >
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
                        <button
                            className="btn btn-success mt-2"
                            type="submit"
                            disabled={isValid}
                        >
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SingInForm;
