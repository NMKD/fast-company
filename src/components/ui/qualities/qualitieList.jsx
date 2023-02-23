import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const QualitieList = ({ qualities }) => {
    return (
        <>
            {qualities.map((q) => (
                <Qualitie key={q.color} {...q} />
            ))}
        </>
    );
};
QualitieList.propTypes = {
    qualities: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default QualitieList;
