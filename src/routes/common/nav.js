import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/common/nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import UserContext from "./userContext";
import RemplrApi from "../../helper/api";
import Brand from "./brand";

const Nav = () => {
  const { currentUser, setCurrentUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    RemplrApi.token = null;
    setCurrentUser(null);
    setToken(null);
    window.localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <>
      {" "}
      <div className="nav-brand">
        <Brand />
      </div>
      <div onClick={() => setMenuOpen(!menuOpen)}>
        <div className="nav-bars">
          <FontAwesomeIcon
            icon={menuOpen ? faTimes : faBars}
            style={menuOpen ? { transform: "rotate(90deg)" } : {}}
          />
        </div>
        <div className={menuOpen ? "nav-item active" : "nav-item"}>
          {currentUser ? (
            <div className="nav-links">
              <Link exact to="/">
                Home
              </Link>
              <Link exact to="/ingredients">
                Ingredients
              </Link>
              <Link exact to="/recipes">
                Recipes
              </Link>
              <Link exact to="/mealplanner">
                MealPlanner
              </Link>
              <Link exact to="/profile">
                My Profile
              </Link>
              <button className="nav-logout" onClick={logout}>
                Log Out
              </button>
            </div>
          ) : (
            <div className="nav-links">
              <Link exact to="/">
                Home
              </Link>
              <Link exact to={`/login`}>
                Login
              </Link>
              <Link exact to={`/get-started`}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Nav;
