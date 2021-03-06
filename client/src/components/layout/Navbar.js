import React, { Fragment, useContext } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/ContactContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const contactContext = useContext(ContactContext);

  const { isAuthenticated, user, logout } = authContext;

  const onLogout = () => {
    logout();
    contactContext.clearContacts();
  };

  const authLinks = (
    <Fragment>
      <li>
        Hello <strong>{user && user.name}&nbsp;&nbsp;</strong>
      </li>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <a onClick={onLogout} href="#!">
          <FontAwesomeIcon icon={["fas", "sign-out-alt"]} />
          &nbsp;
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
    </Fragment>
  );

  return (
    <nav className="navbar bg-primary">
      <h1>
        <Link to="/">
          <FontAwesomeIcon icon={icon} /> {title}
        </Link>
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </nav>
  );
};

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: ["fas", "file-contract"]
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.array.isRequired
};

export default Navbar;
