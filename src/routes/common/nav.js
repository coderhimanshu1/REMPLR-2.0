import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import "../../styles/common/nav.css";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

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
