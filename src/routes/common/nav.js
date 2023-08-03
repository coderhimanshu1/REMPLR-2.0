import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

const Nav = () => {
  return (
    <div className="nav">
      <div className="nav-brand">
        <Link exact to="/">
          <img src={logo} alt="Remplr logo" />
        </Link>
      </div>
      <Link exact to={`/login`}>
        Login
      </Link>
      <Link exact to={`/get-started`}>
        Sign Up
      </Link>
    </div>
  );
};

export default Nav;
