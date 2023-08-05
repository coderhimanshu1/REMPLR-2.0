import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { decodeToken } from "react-jwt";
import useLocalStorage from "./hooks/useLocalStorage";
import "./styles/common/common.css";
import UserContext from "./routes/common/userContext";
import Home from "./routes/home";
import Nav from "./routes/common/nav";
import LoginForm from "./routes/auth/login";
import RegisterForm from "./routes/auth/register";
import Ingredients from "./routes/ingredients/ingredients";
import Ingredient from "./routes/ingredients/ingredient";
import Recipes from "./routes/recipes/recipes";
import Recipe from "./routes/recipes/recipe";
import RemplrApi from "./helper/api";
import "./styles/App.css";

function App() {
  const [token, setToken] = useLocalStorage(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Get user information once we have token from API
  useEffect(() => {
    const getUser = async () => {
      if (token) {
        try {
          let { username } = decodeToken(token);

          let currentUser = await RemplrApi.getUser(username);

          // set the user data to local storage
          window.localStorage.setItem(
            "currentUser",
            JSON.stringify(currentUser)
          );
          setCurrentUser(currentUser);
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setToken(RemplrApi.token);
    };
    getUser();
  }, [token]);

  useEffect(() => {
    // get user data from local storage
    const storedUser = window.localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  /*
  Handles user login
  */
  const handleLogin = async (loginData) => {
    try {
      let token = await RemplrApi.login(loginData);
      setToken(token);
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
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("Register failed", errors);
      return { success: false, errors };
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <UserContext.Provider
            value={{
              currentUser,
              setCurrentUser,
              setToken,
            }}
          >
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/login"
                element={<LoginForm login={handleLogin} />}
              />
              <Route
                path="/get-started"
                element={<RegisterForm register={register} />}
              />
              <Route path="/ingredients" element={<Ingredients />} />
              <Route path="/ingredients/:id" element={<Ingredient />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/recipes/:id" element={<Recipe />} />
            </Routes>
          </UserContext.Provider>
        </Router>
      </header>
    </div>
  );
}

export default App;
