import React from "react";
import PropTypes from "prop-types";

const TextField = ({ label, type, name, value, onChange, errors }) => {
    // const [password, setPassword] = useState(false);
    // const tooglePassword = () => {
    //     setPassword((prevState) => !prevState);
    // };
    const getInputClasses = () => {
        return "form-control " + (errors ? "is-invalid" : "");
    };
    return (
        <div className="mb-2 mb-md-3">
            <label className="form-label" htmlFor={name}></label>
            {label}
            <input
                className={getInputClasses()}
                type={type}
                name={name}
                value={value}
                id={name}
                onChange={onChange}
                required
            />
            {errors && <div className="invalid-feedback">{errors}</div>}
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
