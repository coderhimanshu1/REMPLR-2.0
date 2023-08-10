import Recipes from "../recipes/recipes";

const UserSavedRecipes = () => {
  return (
    <div className="userSavedRecipes">
      <Recipes userSaved={true}>
        <h1>Your Saved Recipes</h1>
      </Recipes>
    </div>
  );
};

export default UserSavedRecipes;
