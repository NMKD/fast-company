import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ currentSort, onSort, columns }) => {
    const handleSort = (item) => {
        onSort({
            path: item,
            order: currentSort.order === "asc" ? "desc" : "asc"
        });
    };
    return (
        <>
            <thead>
                <tr>
                    {Object.keys(columns).map((column) => (
                        <th
                            key={column}
                            onClick={
                                columns[column].path
                                    ? () => handleSort(columns[column].path)
                                    : undefined
                            }
                            {...{ role: columns[column].path && "button" }}
                            scope="col"
                        >
                            {columns[column].name}
                        </th>
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
