import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ value, onChange }) => {
    return (
        <form className="d-flex mt-4">
            <input
                className="form-control me-2"
                type="search"
                placeholder="Search name"
                aria-label="Search"
                value={value}
                onChange={onChange}
            />
            <button className="btn btn-outline-success" type="submit">
                Search
            </button>
        </form>
    );
};

SearchInput.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default SearchInput;
