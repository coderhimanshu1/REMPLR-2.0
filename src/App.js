import React, { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles/common/common.css";
import RemplrApi from "./helper/api";
import RouteContainer from "./routeContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

const App = () => {
  const [storedToken, setStoredToken] = useLocalStorage("token");
  const [currentUser, setCurrentUser] = useState(null);
  const [justLoggedIn, setJustLoggedIn] = useState(false);

  // Get user information once we have token from API
  useEffect(() => {
    const getUser = async () => {
      if (storedToken) {
        try {
          let { username } = decodeToken(storedToken);

          let currentUser = await RemplrApi.getUser(username);

          setCurrentUser(currentUser);
          setStoredToken(storedToken);
        } catch (err) {
          setCurrentUser(null);
        }
      }
    };
    getUser();
  }, [storedToken]);

  // useEffect(() => {
  //   // get user data from local storage
  //   const storedUser = localStorage.getItem("currentUser");
  //   if (storedUser) {
  //     setCurrentUser(JSON.parse(storedUser));
  //   }
  // }, []);

  /*
  Handles user login
  */
  const handleLogin = async (loginData) => {
    try {
      let token = await RemplrApi.login(loginData.username, loginData.password);
      RemplrApi.setToken(token);
      setStoredToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  };

  /** Handles register.
   * Automatically logs them in (set token) upon signup.
   *
   */
  const register = async (signupData) => {
    try {
      let token = await RemplrApi.signupUser(signupData);
      RemplrApi.setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Register failed", errors);
      return { success: false, errors };
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <RouteContainer
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setToken={setStoredToken}
          setJustLoggedIn={setJustLoggedIn}
          handleLogin={handleLogin}
          register={register}
          token={storedToken}
        />
      </header>
    </div>
  );
};

export default App;
