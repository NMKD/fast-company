/* eslint-disable indent */
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

    // Pagination
    const pageSize = 4;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (i) => {
        setCurrentPage(i);
    };

    // professions/api/filter
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();

    const filterredUsers = selectedProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : users;

    const count = filterredUsers.length;
    // Pagination/ отображение пользователей / фильтр
    const usersCrop = paginate(filterredUsers, currentPage, pageSize);

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
    const handleFilterSelect = (item) => {
        setSelectedProf(item);
    };

    const handleClearFilterSelect = () => {
        setSelectedProf();
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        fetchData();
        setCurrentPage(1);
    }, [professions]);

    return (
        <>
            <div className="container pt-4">
                <div className="row">
                    <div className="col col-sm-12 col-lg-2">
                        {professions && (
                            <>
                                <GroupList
                                    selectedItem={selectedProf}
                                    items={professions}
                                    onFilter={handleFilterSelect}
                                />
                                <button
                                    className="btn btn-danger mt-2 mb-2"
                                    onClick={handleClearFilterSelect}
                                >
                                    Очистить
                                </button>
                            </>
                        )}
                    </div>
                    <div className="col col-sm-12 col-lg-8">
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
