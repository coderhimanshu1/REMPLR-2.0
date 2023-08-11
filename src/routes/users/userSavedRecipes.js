import Recipes from "../recipes/recipes";
import "../../styles/users/userSavedRecipes.css";

const UserSavedRecipes = () => {
  return (
    <div className="userSavedRecipes">
      <Recipes userSaved={true}></Recipes>
    </div>
  );
};

export default UserSavedRecipes;
