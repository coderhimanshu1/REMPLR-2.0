import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../../styles/common/nav.css";

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-brand">
        <Link exact to="/">
          <img src={logo} alt="Remplr logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link exact to={`/login`}>
          LOGIN
        </Link>
        <Link exact to={`/get-started`}>
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default Nav;
