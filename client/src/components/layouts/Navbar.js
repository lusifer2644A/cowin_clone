import React, { Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ auth, logout }) => {
    const guestLinks = (
        <ul className="nav_buttons">
            <li className="dark_hover">
                <Link to="/">Home</Link>
            </li>
            <li className="outline dark_hover">
                <Link to="/auth">
                    <i className="fas fa-user mx"></i>
                    <span className="hide-sm">Register / Login</span>
                </Link>
            </li>
        </ul>
    );

    const authLinks = (
        <ul className="nav_buttons">
            <li className="dark_hover" onClick={logout}>
                <Link to="/">
                    <i className="fas fa-sign-out-alt"></i>
                    <span className="hide-sm"> Logout</span>
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="navbar">
            <div className="navLogo large white"></div>
            {auth.isAuthenticated ? authLinks : guestLinks}
        </nav>
    );
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
