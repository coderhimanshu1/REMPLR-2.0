import "../../styles/recipes/recipes.css";
import { useSaveRecipe } from "../../hooks/useSaveRecipe";
import SaveStarButton from "../common/saveStarButton";

const RecipeCard = ({ recipe }) => {
  const { isSaved, handleRecipeSave } = useSaveRecipe(recipe.id);
  return (
    <div className="recipes-card" key={recipe.id}>
      <img src={recipe.image} alt={recipe.title} />
      <div className="recipes-dietary-icons">
        {recipe.vegetarian && <span title="Vegetarian">🌱</span>}
        {recipe.vegan && <span title="Vegan">🥕</span>}
        {recipe.dairyFree && <span title="Dairy-Free">🥛❌</span>}
        {/* Star icon to save Recipe */}
        <SaveStarButton isSaved={isSaved} handleSave={handleRecipeSave} />
      </div>

      <h3>{recipe.title}</h3>
    </div>
  );
};

export default RecipeCard;
