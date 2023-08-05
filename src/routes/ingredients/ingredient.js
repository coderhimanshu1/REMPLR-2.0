import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import RemplrApi from "../../helper/api";
import "../../styles/ingredients/ingredient.css";
import ingredientImg from "../../images/ingredient.webp";
import { useSaveIngredient } from "../../hooks/useSaveIngredient";
import SaveHeartButton from "../common/saveHeartButton";
import Nutrition from "../common/nutrition";
import UserContext from "../common/userContext";

const Ingredient = () => {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState(null);
  const { isSaved, handleIngredientSave } = useSaveIngredient(id);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
  }

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
          <Nutrition
            mapper={ingredient.nutrients}
            item={ingredient.nutrients}
          />
        )}
    </div>
  );
};

export default Ingredient;
