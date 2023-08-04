import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RemplrApi from "../../helper/api";
import "../../styles/recipes/recipes.css";
import RecipeCard from "./recipeCard";
import Alert from "../common/alert";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await RemplrApi.getRecipes();
        setRecipes(response.recipes);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="recipes">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Alert
            type="success"
            messages={[
              "Click on Recipe card to view recipe's nutritional information.",
            ]}
          />
          {recipes.map((recipe) => (
            <Link to={`/recipes/${recipe.id}`}>
              <RecipeCard recipe={recipe} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;
