/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SearchStatus from "./searchStatus";
import Pagination from "./pagination";
import paginate from "../../utils/paginate";
import GroupList from "./groupList";
import Table from "./table";
import _ from "lodash";
import api from "../../api";

const Users = ({ users, onDelete, onToogle }) => {
    // Pagination
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);
    // professions/api/filter
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    const filterredUsers = selectedProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : users;

    const count = filterredUsers.length;

    const sortedUsers = _.orderBy(
        filterredUsers,
        [sortBy.iter],
        [sortBy.order]
    );

    // Pagination/ отображение пользователей / фильтр
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

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
    // Pagination
    const handlePageChange = (i) => {
        setCurrentPage(i);
    };

    const handleFilterSelect = (item) => {
        setSelectedProf(item);
    };

    const handleClearFilterSelect = () => {
        setSelectedProf();
    };

    // Sort table
    const handleSortTable = (item) => {
        setSortBy((prevState) => ({
            iter: item,
            order: prevState.order === "asc" ? "desc" : "asc"
        }));
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
                            <Table
                                users={usersCrop}
                                onDelete={onDelete}
                                onToogle={onToogle}
                                onSort={handleSortTable}
                            />
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
