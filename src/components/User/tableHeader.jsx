import React, { useState } from "react";
import PropTypes from "prop-types";
import IconsCaret from "./iconsCaret";

const TableHeader = ({ currentSort, onSort, columns }) => {
    const newColumns = Object.values(columns);
    const [activeColumn, setActiveColumn] = useState([...newColumns]);

    const handleSort = (item) => {
        onSort({
            path: item,
            order: currentSort.order === "asc" ? "desc" : "asc"
        });
        setActiveColumn(
            activeColumn.map((col) => ({
                ...col,
                active: col.path === item && (col.active = true)
            }))
        );
    };

    return (
        <>
            <thead>
                <tr>
                    {activeColumn.map((col) => (
                        <>
                            <th
                                key={col.name}
                                onClick={
                                    col.path
                                        ? () => handleSort(col.path)
                                        : undefined
                                }
                                {...{ role: col.path && "button" }}
                                scope="col"
                            >
                                {col.name}
                                <IconsCaret
                                    {...{ currentSort }}
                                    active={col.active}
                                />
                            </th>
                        </>
                    ))}
                </tr>
            </thead>
        </>
    );
};

TableHeader.propTypes = {
    currentSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
