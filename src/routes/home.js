import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home">
      <div className="home-header">
        <div className="home-text">
          <h1>REMPLR</h1>
          <small>Meal Plans Made Simple.</small>
        </div>
      </div>

      <div className="home-about">
        <div className="home-about-img"></div>
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
            transform your client's health and well-being through the power of
            nutrition.
          </p>
          <p>
            We understand that creating meal plans can be time-consuming and
            challenging. That's why we've developed a user-friendly interface
            that simplifies the process, allowing nutrition professionals to
            save valuable time and focus on what truly matters – guiding your
            clients toward a healthier lifestyle.
          </p>
        </div>
      </div>

      <div className="home-action">
        <h1>HOW IT WORKS</h1>
        <div className="home-action-steps">
          <div className="home-action-step">
            <small>1</small>
            <h3>
              Register to get access to our available database of recipes and
              ingredients.
            </h3>
          </div>
          <div className="home-action-step">
            <small>2</small>
            <h3>Add your clients and understand their likes and motivation.</h3>
          </div>
          <div className="home-action-step">
            <small>3</small>
            <h3>
              Use our simplified meal plan creator and share the meal plan with
              one click button.
            </h3>
          </div>
        </div>
        <div className="home-action-button">
          <Link to={`/get-started`}>
            <button>SIGN UP NOW</button>
          </Link>
        </div>
      </div>

      <div className="home-features">
        <h1>FEATURES</h1>
        <div className="home-features-cards">
          <div className="home-features-card1">
            <h3>Ingredients Management</h3>
            <small>Get Ingredients information including its nutrition</small>
          </div>
          <div className="home-features-card2">
            <h3>Recipes Management</h3>
            <small>Get recipes information including its nutrition</small>
          </div>
          <div className="home-features-card3">
            <h3>Meal Plans Management</h3>
            <small>Create Meal Plans and share with your clients</small>
          </div>
        </div>
      </div>

      <div className="home-reviews">
        <div className="home-review-title">
          <h1>REVIEWS</h1>
          <h2>Hear from other Nutritionists</h2>
        </div>
        <div className="home-review-container">
          <div className="home-review">
            <p>
              I absolutely love Remplr! It's a game-changer for my nutrition
              practice, allowing me to create personalized meal plans for my
              clients effortlessly."
            </p>
            <small>@frances</small>
          </div>
          <div className="home-review">
            <p>
              Thanks to Remplr, The recipe library is a treasure trove of
              deliciousness!
            </p>
            <small>@Ralph</small>
          </div>
          <div className="home-review">
            <p>
              Highly recommend Remplr for anyone serious about helping thier
              clients with their health goals.
            </p>
            <small>@Kat</small>
          </div>
        </div>
      </div>

      <div className="home-contact">
        <h1>GET IN TOUCH</h1>
        <div className="home-contact-container">
          <div className="home-contact-socials">
            <h3>SOCIALS</h3>
            <div className="home-contact-social-container">
              <small>Instagram</small>
              <small>Twitter</small>
              <small>Facebook</small>
              <small>LinkedIn</small>
            </div>
          </div>
          <p>HELLO@REMPLR.COM</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
