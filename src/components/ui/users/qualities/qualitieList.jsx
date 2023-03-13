import React from "react";
import Qualitie from "./qualitie";
import PropTypes from "prop-types";

const QualitieList = ({ qualities }) => {
    return (
        <>
            <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                    <h6 className="card-title">
                        <span>Qualities</span>
                    </h6>
                    <p className="card-text">
                        {qualities &&
                            qualities.map((q) => (
                                <Qualitie key={q.color} {...q} />
                            ))}
                    </p>
                </div>
            </div>
        </>
    );
};
QualitieList.propTypes = {
    qualities: PropTypes.arrayOf(PropTypes.object)
};

export default QualitieList;
