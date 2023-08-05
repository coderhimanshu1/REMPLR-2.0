import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../../styles/common/nav.css";
import UserContext from "./userContext";
import RemplrApi from "../../helper/api";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, setCurrentUser, setToken } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    RemplrApi.token = null;
    setCurrentUser(null);
    setToken(null);
    // remove user data from local storage
    window.localStorage.removeItem("currentUser");
    navigate("/");
  };

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 200) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let navbarClasses = ["nav"];
  if (scrolled) {
    navbarClasses.push("scrolled");
  }

  return (
    <div className={navbarClasses.join(" ")}>
      <div className="nav-brand">
        <Link exact to="/">
          <img src={logo} alt="Remplr logo" />
        </Link>
      </div>
      {currentUser ? (
        <div className="nav-links">
          <Link exact to="/ingredients">
            INGREDIENTS
          </Link>
          <Link exact to="/recipes">
            RECIPES
          </Link>
          <Link exact to="/mealplans">
            MEALPLANS
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
          <Link exact to={`/login`}>
            LOGIN
          </Link>
          <Link exact to={`/get-started`}>
            SIGN UP
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
