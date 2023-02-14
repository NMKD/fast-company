import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    selectedItem,
    valueProperty,
    contentProperty,
    onFilter
}) => {
    return (
        <>
            <ul className="list-group">
                {Object.keys(items).map((item) => (
                    <li
                        className={
                            "list-group-item " +
                            (selectedItem === items[item] ? "active" : "")
                        }
                        key={items[item][valueProperty]}
                        onClick={() => onFilter(items[item])}
                        role="button"
                    >
                        {items[item][contentProperty]}
                    </li>
                ))}
            </ul>
        </>
    );
};
GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};
GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    selectedItem: PropTypes.object,
    valueProperty: PropTypes.string,
    contentProperty: PropTypes.string,
    onFilter: PropTypes.func.isRequired
};

export default GroupList;
