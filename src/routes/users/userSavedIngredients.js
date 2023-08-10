import Ingredients from "../ingredients/ingredients";

const UserSavedIngredients = () => {
  return (
    <div className="userSavedIngredients">
      <Ingredients userSaved={true}>
        <h1>Your Saved Ingredients</h1>
      </Ingredients>
    </div>
  );
};

export default UserSavedIngredients;
