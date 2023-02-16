import React from "react";
import PropTypes from "prop-types";

const IconsCaret = ({ currentSort, active }) => {
    return (
        <>
            {active && (
                <i
                    className={
                        "bi bi-caret-" +
                        (currentSort.order === "asc" ? "down-fill" : "up-fill")
                    }
                ></i>
            )}
        </>
    );
};

IconsCaret.propTypes = {
    currentSort: PropTypes.object.isRequired,
    active: PropTypes.bool
};

export default IconsCaret;
