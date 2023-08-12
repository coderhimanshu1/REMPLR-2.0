import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import UserContext from "./routes/common/userContext";
import Home from "./routes/homepage/home";
import Nav from "./routes/common/nav";
import LoginForm from "./routes/auth/login";
import RegisterForm from "./routes/auth/register";
import Ingredients from "./routes/ingredients/ingredients";
import Ingredient from "./routes/ingredients/ingredient";
import Recipes from "./routes/recipes/recipes";
import Recipe from "./routes/recipes/recipe";
import MealPlanner from "./routes/mealplans/mealPlanner";
import UserSavedRecipes from "./routes/users/userSavedRecipes";
import UserSavedIngredients from "./routes/users/userSavedIngredients";
import Profile from "./routes/users/profile";

const RouteContainer = ({
  currentUser,
  setCurrentUser,
  token,
  setToken,
  justLoggedIn,
  setJustLoggedIn,
  handleLogin,
  register,
}) => {
  return (
    <>
      <Router>
        <UserContext.Provider
          value={{
            currentUser,
            setCurrentUser,
            setToken,
            justLoggedIn,
            setJustLoggedIn,
            token,
          }}
        >
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
            <Route path="/recipes/:id" element={<Recipe />} />
            <Route path="/mealplanner" element={<MealPlanner />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/favorite-ingredients"
              element={<UserSavedIngredients />}
            />
            <Route path="/favorite-recipes" element={<UserSavedRecipes />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </>
  );
};

export default RouteContainer;
