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
      <div className="home-about">
        <div className="home-about-img">
          {/* <img src={about} alt="About Image" /> */}
        </div>
        <div className="home-about-text">
          <h1>ABOUT</h1>
          <p>
            At Remplr, we believe that nutrition is the cornerstone of a healthy
            and fulfilling life. Our platform is dedicated to empowering
            nutrition professionals and enthusiasts alike to create personalized
            meal plans that cater to their clients' unique dietary needs and
            preferences.
          </p>
          <p>
            Our mission is to revolutionize the way meal planning is done by
            providing a seamless and efficient platform for nutritionists,
            dietitians, fitness coaches, and health enthusiasts to craft
            expertly tailored meal plans. We strive to make the process of meal
            planning easy, enjoyable, and accessible to all, helping our users
            transform their client's health and well-being through the power of
            nutrition.
          </p>
          <p>
            We understand that creating meal plans can be time-consuming and
            challenging. That's why we've developed a user-friendly interface
            that simplifies the process, allowing nutrition professionals to
            save valuable time and focus on what truly matters – guiding their
            clients toward a healthier lifestyle.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
