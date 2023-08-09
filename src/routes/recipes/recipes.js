import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import RemplrApi from "../../helper/api";
import "../../styles/recipes/recipes.css";
import RecipeCard from "./recipeCard";
import Alert from "../common/alert";
import UserContext from "../common/userContext";

function Recipes({ handleAddRecipe, showAddButton }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await RemplrApi.getRecipes();
        setRecipes(response.recipes);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipes">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Alert
            type="success"
            messages={[
              "Click on Recipe card to view recipe's nutritional information.",
            ]}
          />
          {recipes.map((recipe) => (
            <div className="recipe-card">
              <Link to={`/recipes/${recipe.id}`}>
                <RecipeCard recipe={recipe} handleAddRecipe={handleAddRecipe} />
              </Link>
              {showAddButton && (
                <button onClick={() => handleAddRecipe(recipe)}>Add</button>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Recipes;
