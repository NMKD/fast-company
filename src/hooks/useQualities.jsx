import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualityService from "../service/quality.service";

const QualitiesContext = React.createContext();

export const useQualitiesContext = () => {
    return useContext(QualitiesContext);
};

const QualitiesProvider = ({ children }) => {
    const [qualities, setQualities] = useState();

    useEffect(() => {
        async function fetchData() {
            const allQualities = await qualityService.fetchAll();
            if (typeof allQualities !== "string") {
                const { data } = allQualities;
                setQualities(data.content);
            } else {
                toast.error(`Ошибка: ${allQualities}`);
            }
        }
        fetchData();
    }, []);
    return (
        <QualitiesContext.Provider value={{ qualities }}>
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default QualitiesProvider;
