import React, { useContext, useState } from "react";
import UserContext from "../common/userContext";
import "../../styles/home.css";

import Header from "./header";
import About from "./about";
import CallToAction from "./callToAction";
import Features from "./features";
import Reviews from "./reviews";
import Contact from "./contact";
import LoadingScreen from "../common/loading";

const Home = () => {
  const { currentUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="home">
      {!currentUser && (
        <>
          <Header />
          <About />
          <CallToAction />
          <Features />
          <Reviews />
          <Contact />
        </>
      )}

      {currentUser && (
        <>
          <Header />
          <Features />
          <CallToAction />
          <Reviews />
          <Contact />
        </>
      )}
    </div>
  );
};

export default Home;
