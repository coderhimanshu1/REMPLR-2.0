import React from "react";
import "../styles/home.css";
import logo from "../images/logo.svg";

const Home = () => {
  return (
    <div className="home">
      <div className="home-header">
        <img src={logo} alt="Remplr logo" />
        <div className="home-text">
          <h1>REMPLR</h1>
          <small>Meal Plans Made Simple.</small>
        </div>
      </div>
    </div>
  );
};

export default Home;
