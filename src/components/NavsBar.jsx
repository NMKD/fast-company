import React from "react";
import { Link } from "react-router-dom";
const NavsBar = () => {
    return (
        <>
            <ul className="nav">
                <li className="nav-item">
                    <Link className="nav-link active" to="/">
                        Main
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/singin">
                        SingIn
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link active" to="/users">
                        Users
                    </Link>
                </li>
            </ul>
        </>
    );
};

export default NavsBar;
