import React from "react";
import PropTypes from "prop-types";

const GroupList = ({ items }) => {
    const professions = Object.keys(items);
    return (
        <>
            <ul className="list-group">
                {professions.map((item, i) => (
                    <li className="list-group-item" key={`${item}-${i}`}>
                        {item}
                    </li>
                ))}
            </ul>
        </>
    );
};

GroupList.propTypes = {
    items: PropTypes.object.isRequired
};

export default GroupList;
