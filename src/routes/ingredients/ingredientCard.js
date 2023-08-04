import ingredientImg from "../../images/ingredient.webp";
import { useSaveIngredient } from "../../hooks/useSaveIngredient";
import SaveHeartButton from "../common/saveHeartButton";

const IngredientCard = ({ ingredient }) => {
  const { isSaved, handleIngredientSave } = useSaveIngredient(ingredient.id);
  return (
    <div className="ingredients-card" key={ingredient.id}>
      <img
        src={
          ingredient.image
            ? "https://spoonacular.com/cdn/ingredients_250x250/" +
              ingredient.image
            : ingredientImg
        }
        alt={ingredient.name}
      />
      {/* Star icon to save ingredient */}
      <SaveHeartButton isSaved={isSaved} handleSave={handleIngredientSave} />

      <h3>{ingredient.name}</h3>
    </div>
  );
};

export default IngredientCard;
