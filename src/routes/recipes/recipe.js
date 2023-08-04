import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import RemplrApi from "../../helper/api";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

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
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <small>
        Source:
        <a href={recipe.sourceurl} target="_blank" rel="noreferrer">
          {recipe.creditstext}
        </a>
      </small>
      <p>
        {recipe.vegetarian && <span title="Vegetarian">🌱 Vegetarian</span>}
        {recipe.vegan && <span title="Vegan">🥕 Vegan</span>}
        {recipe.dairyFree && <span title="Dairy-Free">🥛❌ Diary free</span>}
      </p>
      <p>Time to cook: {recipe.readyinminutes} minutes</p>
      <p>Servings: {recipe.servings}</p>
      <p>Diets: {recipe.diets}</p>
      <table>
        <thead>
          <tr>
            <th>Nutrient</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {recipe.nutrients &&
            recipe.nutrients.map((nutrient, index) => (
              <tr key={index}>
                <td>{nutrient.name}</td>
                <td>
                  {nutrient.amount} {nutrient.unit}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h2>Ingredients</h2>
      <ul>
        {recipe.ingredients &&
          recipe.ingredients.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
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
  );
};

export default Recipe;
