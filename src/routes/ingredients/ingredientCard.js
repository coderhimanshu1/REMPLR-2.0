import ingredientImg from "../../images/ingredient.webp";

const IngredientCard = ({ ingredient }) => {
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
      <h3>{ingredient.name}</h3>
    </div>
  );
};

export default IngredientCard;
