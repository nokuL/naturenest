import React, { useContext } from "react";
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../../context/authContext";

const NavLinks = props => {
    const auth = useContext(AuthContext);
    
    return (
        <ul className="flex space-x-6 items-center text-sm font-medium text-mountain-dark">
            <li>
                <div className="group">
                <NavLink
                    to="/"
                    className="hover:text-sky transition-colors"
                    activeClassName="text-forest"
                >
                    All Users
                </NavLink>
                <div className="mt-2 mx-2 duration-200 border-b-2 opacity-0 border-forest group-hover:opacity-100"></div>
                </div>
            </li>
            {auth.isLoggedIn && (
                <li>
                    <div className="group">
                    <NavLink
                        to="/u1/places"
                        className="hover:text-sky transition-colors"
                        activeClassName="text-forest"
                    >
                        My Places
                    </NavLink>
                    <div className="mt-2 mx-2 duration-200 border-b-2 opacity-0 border-forest group-hover:opacity-100"></div>
                    </div>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <div className="group">
                    <NavLink
                        to="/places/newPlace"
                        className="hover:text-sky transition-colors"
                        activeClassName="text-forest"
                    >
                        Add Place
                    </NavLink>
                    <div className="mt-2 mx-2 border-b-2 opacity-0 border-forest group-hover:opacity-100"></div>
                    </div>
                </li>
            )}
            {!auth.isLoggedIn && (
                <li>
                    <div className="group">
                    <NavLink
                        to="/auth"
                        className="hover:text-sky transition-colors"
                        activeClassName="text-forest"
                    >
                        Authenticate
                    </NavLink>
                    <div className="mt-2 mx-2 duration-200 border-b-2 opacity-0 border-forest group-hover:opacity-100"></div>
                    </div>
                </li>
            )}
            {auth.isLoggedIn && (
                <li>
                    <div className="group">
                    <button
                        onClick={auth.logout}
                        className="hover:text-sky transition-colors"
                    >
                        Logout
                    </button>
                    <div className="mt-2 mx-2 border-b-2 opacity-0 border-forest group-hover:opacity-100"></div>
                    </div>
                </li>
            )}
        </ul>
    )
}

export default NavLinks;