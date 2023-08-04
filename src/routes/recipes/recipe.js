import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/recipes/recipe.css";
import RemplrApi from "../../helper/api";
import { useSaveRecipe } from "../../hooks/useSaveRecipe";
import SaveHeartButton from "../common/saveHeartButton";
import "../common/nutrition";
import Nutrition from "../common/nutrition";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const { isSaved, handleRecipeSave } = useSaveRecipe(id);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await RemplrApi.getRecipe(id);
        setRecipe(data.recipe);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      }
    };
    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipe">
      <div className="recipe-header">
        <h1>{recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} />
        <small className="recipe-caption">
          {/* Star icon to save Recipe */}
          <SaveHeartButton isSaved={isSaved} handleSave={handleRecipeSave} />

          <a href={recipe.sourceurl} target="_blank" rel="noreferrer">
            Source: {recipe.creditstext}
          </a>
        </small>
        <p className="recipe-">
          {recipe.vegetarian && <span title="Vegetarian">🌱 Vegetarian</span>}
          {recipe.vegan && <span title="Vegan">🥕 Vegan</span>}
          {recipe.dairyFree && <span title="Dairy-Free">🥛❌ Diary free</span>}
        </p>
        <p>Time to cook: {recipe.readyinminutes} minutes</p>
        <p>Servings: {recipe.servings}</p>
        <p>Diets: {recipe.diets}</p>
      </div>
      <div className="recipe-details">
        <Nutrition mapper={recipe.nutrients} item={recipe.nutrients.nutrient} />
        <div className="recipe-prep">
          <h2>Ingredients</h2>
          <ul>
            {recipe.ingredients &&
              recipe.ingredients.map((Recipe) => (
                <li key={Recipe.id}>
                  {Recipe.amount} {Recipe.unit} {Recipe.name}
                </li>
              ))}
          </ul>
          <h2>Instructions</h2>
          {recipe.instructions && recipe.instructions.length > 0 ? (
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction.step}</li>
              ))}
            </ol>
          ) : (
            <p>Instructions for this recipe have not been posted yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipe;
