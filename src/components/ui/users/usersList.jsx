/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import SearchStatus from "../table/heading/searchStatus";
import Pagination from "../table/pagination/pagination";
import paginate from "../../../utils/paginate";
import GroupList from "./professions/groupList";
import TableList from "../table/tableList";
import SearchInput from "../form/fields/searchInput";
import _ from "lodash";
import api from "../../../api";

const UsersList = () => {
    // professions/api/users
    const [users, setUsers] = useState([]);
    // professions/api/filter
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({
        path: "name",
        order: "asc",
        ative: false
    });
    // Pagination/
    const pageSize = 6;
    const [currentPage, setCurrentPage] = useState(1);

    // search users
    const [searchInput, setSearchInput] = useState("");

    const filterredUsers = searchInput
        ? users.filter((user) =>
              user.name.toLowerCase().includes(searchInput.toLowerCase())
          )
        : selectedProf
        ? users.filter(
              (user) =>
                  JSON.stringify(user.profession) ===
                  JSON.stringify(selectedProf)
          )
        : users;

    const count = filterredUsers.length;

    const sortedUsers = _.orderBy(
        filterredUsers,
        [sortBy.path],
        [sortBy.order]
    );

    // Pagination/ отображение пользователей / фильтр
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

    // Search
    const handleChangeSearch = ({ target }) => {
        const { value } = target;
        setSearchInput(value);
        setSelectedProf();
    };

    // Pagination
    const handlePageChange = (i) => {
        setCurrentPage(i);
    };

    const handleFilterSelect = (item) => {
        setSelectedProf(item);
        setSearchInput("");
    };

    const handleClearFilterSelect = () => {
        setSelectedProf();
    };

    // Sort table
    const handleSortTable = (item) => {
        setSortBy(item);
    };

    const handleDelete = (userId) =>
        setUsers((prevState) => prevState.filter((d) => d._id !== userId));

    const handleToogleBookMark = (id) => {
        setUsers(
            users.map((user) => ({
                ...user,
                bookmark:
                    user._id === id
                        ? (user.bookmark = !user.bookmark)
                        : user.bookmark
            }))
        );
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    useEffect(() => {
        async function fetchData() {
            try {
                setUsers(await api.users.fetchAll());
            } catch (error) {
                throw new Error(
                    "error when mounting the component usersList when fetchData to api/users"
                );
            }
        }
        fetchData();
    }, [users]);

    useEffect(() => {
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
        fetchData();
        setCurrentPage(1);
    }, [professions]);

    if (users.length === 0) {
        return <h2>Loading...</h2>;
    }

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
                        <SearchInput
                            value={searchInput}
                            onChange={handleChangeSearch}
                        />
                        {count > 0 && (
                            <TableList
                                users={usersCrop}
                                onDelete={handleDelete}
                                onToogle={handleToogleBookMark}
                                onSort={handleSortTable}
                                currentSort={sortBy}
                            />
                        )}
                        <Pagination
                            itemsCount={count}
                            {...{ pageSize, currentPage }}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default UsersList;
