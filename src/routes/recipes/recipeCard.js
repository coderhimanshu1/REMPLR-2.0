import "../../styles/recipes/recipes.css";
import { useSaveRecipe } from "../../hooks/useSaveRecipe";
import SaveHeartButton from "../common/saveHeartButton";

const RecipeCard = ({ recipe }) => {
  const { isSaved, handleRecipeSave } = useSaveRecipe(recipe.id);
  return (
    <div className="recipes-card" key={recipe.id}>
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipes-caption">
        <span className="recipe-diet">
          {recipe.vegetarian && <span title="Vegetarian">🌱</span>}
          {recipe.vegan && <span title="Vegan">🥕</span>}
          {recipe.dairyFree && <span title="Dairy-Free">🥛❌</span>}
        </span>
        {/* Star icon to save Recipe */}
        <span className="recipe-star">
          <SaveHeartButton isSaved={isSaved} handleSave={handleRecipeSave} />
        </span>
      </div>

      <h3>{recipe.title}</h3>
    </div>
  );
};

export default RecipeCard;
