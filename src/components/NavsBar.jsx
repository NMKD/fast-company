import React from "react";
import { Link } from "react-router-dom";
const NavsBar = () => {
    return (
        <>
            <ul className="nav">
                <li className="nav-item m-2">
                    <Link className="nav-link" to="/">
                        Main
                    </Link>
                </li>
                <li className="nav-item m-2">
                    <Link className="nav-link" to="/singin">
                        SingIn
                    </Link>
                </li>
                <li className="nav-item m-2">
                    <Link className="nav-link" to="/users">
                        Users
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default NavsBar;
