import React from "react";
import PropTypes from "prop-types";

const Select = ({
    label,
    defaulOption,
    name,
    options,
    onChange,
    value,
    error
}) => {
    const getInputClasses = () => {
        return "form-control " + (error ? "is-invalid" : "");
    };
    return (
        <div className="mb-2 mb-md-3">
            <label htmlFor="profession" className="form-label">
                {label}
            </label>
            <select
                className={getInputClasses()}
                onChange={onChange}
                name={name}
                value={value}
            >
                <option disabled value="">
                    {defaulOption}
                </option>
                {options &&
                    options.map((prof) => (
                        <option
                            selected={prof.name === value}
                            key={prof._id}
                            value={prof.name}
                        >
                            {prof.name}
                        </option>
                    ))}
            </select>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string.isRequired,
    defaulOption: PropTypes.string.isRequired,
    options: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    error: PropTypes.string,
    name: PropTypes.string.isRequired
};

export default Select;
