import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Nav from "./routes/common/nav";
import LoginForm from "./routes/auth/login";
import RegisterForm from "./routes/auth/register";
import Ingredients from "./routes/ingredients/ingredients";
import Recipes from "./routes/recipes/recipes";
import Ingredient from "./routes/ingredients/ingredient";
import { useState } from "react";
import RemplrApi from "./helper/api";
import "./styles/App.css";

function App() {
  const [token, setToken] = useState(null);

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
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm login={handleLogin} />} />
            <Route
              path="/get-started"
              element={<RegisterForm register={register} />}
            />
            <Route path="/ingredients" element={<Ingredients />} />
            <Route path="/ingredients/:id" element={<Ingredient />} />
            <Route path="/recipes" element={<Recipes />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
