import React, { useState, useEffect } from "react";
import User from "./user";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import paginate from "../../utils/paginate";
import GroupList from "./groupList";
import api from "../../api";

const Users = ({ users, onDelete, onToogle }) => {
    const tableHead = [
        "Имя",
        "Качество",
        "Профессия",
        "Встретился, раз",
        "Оценка",
        "Избранное"
    ];

    const count = users.length;
    // Pagination
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (i) => {
        setCurrentPage(i);
    };
    const usersCrop = paginate(users, currentPage, pageSize);

    // professions/api
    const [professions, setProfessions] = useState();
    async function fetchData() {
        try {
            const newProf = await api.professions.fetchAll();
            setProfessions(newProf);
        } catch (error) {
            throw new Error(
                "error when mounting the component GroupList in Users"
            );
        }
    }
    const handleFilterSelect = (params) => {
        console.log(params);
    };
    useEffect(() => {
        fetchData();
        setCurrentPage(1);
    }, []);

    return (
        <>
            <div className="container pt-4">
                <div className="row">
                    <div className="col-2">
                        {professions && (
                            <GroupList
                                items={professions}
                                onFilter={handleFilterSelect}
                            />
                        )}
                    </div>
                    <div className="col-10">
                        <SearchStatus length={count} />
                        {count > 0 && (
                            <table className="table">
                                <thead>
                                    <tr>
                                        {tableHead.map((h) => (
                                            <th scope="col" key={h}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {usersCrop.map((user) => (
                                        <User
                                            key={user._id}
                                            {...user}
                                            remove={onDelete}
                                            onToogle={onToogle}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        )}
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

Users.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object).isRequired,
    onDelete: PropTypes.func.isRequired,
    onToogle: PropTypes.func.isRequired
};

export default Users;
