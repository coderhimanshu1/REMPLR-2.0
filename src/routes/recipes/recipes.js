import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RemplrApi from "../../helper/api";
import "../../styles/recipes/recipes.css";

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
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <Link to={`/recipes/${recipe.id}`}>
                <img src={recipe.image} alt={recipe.title} />
                <div className="recipe-dietary-icons">
                  {recipe.vegetarian && <span title="Vegetarian">🌱</span>}
                  {recipe.vegan && <span title="Vegan">🥕</span>}
                  {recipe.dairyFree && <span title="Dairy-Free">🥛❌</span>}
                </div>
                <h3>{recipe.title}</h3>
              </Link>

              <small>
                Source:
                <a href={recipe.sourceurl} target="_blank" rel="noreferrer">
                  {recipe.creditstext}
                </a>
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Recipes;
