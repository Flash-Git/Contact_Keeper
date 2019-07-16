import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";

const Navbar = ({ title, icon }) => (
  <nav className="navbar bg-primary">
    <h1>
      <FontAwesomeIcon icon={icon} /> {title}
    </h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  </nav>
);

Navbar.defaultProps = {
  title: "Contact Keeper",
  icon: ["fab", "github"]
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.array.isRequired
};

export default Navbar;
