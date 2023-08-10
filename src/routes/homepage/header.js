import React, { useContext, useEffect } from "react";
import Alert from "../common/alert";
import UserContext from "../common/userContext";

const Header = () => {
  const { currentUser, justLoggedIn, setJustLoggedIn } =
    useContext(UserContext);

  useEffect(() => {
    if (justLoggedIn) {
      setTimeout(() => {
        setJustLoggedIn(false);
      }, 2500);
    }
  }, [justLoggedIn, setJustLoggedIn]);

  return (
    <div className="home-header">
      <div className="home-header-top"></div>
      {currentUser && justLoggedIn ? (
        <Alert
          type="success"
          messages={[`Welcome Back ${currentUser.username}!`]}
        />
      ) : null}
      <div className="home-text">
        <h1>REMPLR</h1>
        <small>Meal Plans Made Simple.</small>
      </div>
    </div>
  );
};

export default Header;
