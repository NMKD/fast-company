import React from "react";
import PropTypes from "prop-types";
import Table from "./table";
import BookMark from "./bookmark";
import QualitieList from "./qualitieList";

const TableUsers = ({ users, onDelete, onToogle, currentSort, onSort }) => {
    const columns = {
        name: { path: "name", name: "Имя" },
        qualities: {
            name: "Качества",
            component: (user) => <QualitieList qualities={user.qualities} />
        },
        profession: { path: "profession.name", name: "Профессия" },
        completedMeetings: {
            path: "completedMeetings",
            name: "Встретился, раз"
        },
        rate: { path: "rate", name: "Оценка" },
        bookmark: {
            path: "bookmark",
            name: "Избранное",
            component: (user) => (
                <BookMark
                    {...{ toogle: onToogle }}
                    status={user.bookmark}
                    id={user._id}
                />
            )
        },
        delete: {
            component: (user) => (
                <button
                    className="btn btn-danger"
                    onClick={() => onDelete(user._id)}
                >
                    delete
                </button>
            )
        }
    };
    return (
        <>
            <Table {...{ currentSort, onSort, columns, data: users }} />
        </>
    );
};

TableUsers.propTypes = {
    users: PropTypes.array.isRequired,
    onDelete: PropTypes.func.isRequired,
    onToogle: PropTypes.func.isRequired,
    currentSort: PropTypes.object.isRequired,
    onSort: PropTypes.func.isRequired
};

export default TableUsers;
