import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RemplrApi from "../../helper/api";
import "../../styles/ingredients/ingredient.css";
import ingredientImg from "../../images/ingredient.webp";
import { FaRegStar } from "react-icons/fa";
import { useSaveIngredient } from "../../hooks/useSaveIngredient";
import SaveHeartButton from "../common/saveHeartButton";

const Ingredient = () => {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState(null);
  const { isSaved, handleIngredientSave } = useSaveIngredient(id);

  useEffect(() => {
    async function fetchIngredient() {
      const response = await RemplrApi.getIngredient(id);
      setIngredient(response.ingredient);
    }
    fetchIngredient();
  }, [id]);

  return (
    <div className="ingredient">
      {ingredient && (
        <div className="ingredient-detail">
          <img
            src={
              ingredient.image
                ? "https://spoonacular.com/cdn/ingredients_250x250/" +
                  ingredient.image
                : ingredientImg
            }
            alt={ingredient.name}
          />

          <h1>{ingredient.name}</h1>
          {/* Star icon to save ingredient */}
          <SaveHeartButton
            isSaved={isSaved}
            handleSave={handleIngredientSave}
          />

          <p>
            Amount: {ingredient.amount} {ingredient.unit}
          </p>
          <p>Aisle: {ingredient.aisle}</p>
        </div>
      )}
      {ingredient &&
        ingredient.nutrients &&
        ingredient.nutrients.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>% of Daily Needs</th>
              </tr>
            </thead>
            <tbody>
              {ingredient.nutrients.map((nutrient, index) => (
                <tr key={index}>
                  <td>{nutrient.name}</td>
                  <td>
                    {nutrient.amount} {nutrient.unit}
                  </td>
                  <td>{nutrient.percentOfDailyNeeds}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
};

export default Ingredient;
