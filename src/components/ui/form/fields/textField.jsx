import React, { useState } from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, errors }) => {
    const [showPassword, setShowPassword] = useState(false);

    // Метод для изменения состояния
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    const getInputClasses = () => {
        return "form-control " + (errors ? "is-invalid" : "");
    };
    const handleChangeData = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={name}>
                {label}
            </label>
            <div className="input-group has-validation">
                <input
                    className={getInputClasses()}
                    type={showPassword ? "text" : type}
                    name={name}
                    value={value}
                    id={name}
                    onChange={handleChangeData}
                    required
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {errors && <div className="invalid-feedback">{errors}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    errors: PropTypes.string
};

export default TextField;
