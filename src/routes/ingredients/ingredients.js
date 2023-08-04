import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RemplrApi from "../../helper/api";
import "../../styles/ingredients/ingredients.css";
import ingredientImg from "../../images/ingredient.webp";
import Alert from "../common/alert";

function Ingredients() {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIngredients = async () => {
      const response = await RemplrApi.getIngredients();
      // Filtering only valid ingredients based on their name
      const validIngredients = response.ingredients.filter((ingredient) =>
        isValidName(ingredient.name)
      );
      setIngredients(validIngredients);
      setIsLoading(false);
    };
    fetchIngredients();
  }, []);

  const isValidName = (name) => {
    // List of invalid patterns
    const invalidPatterns = [
      "--",
      "© - 2013",
      "© 2016",
      "niã§oise",
      "————",
      "°",
    ];

    // Return false if name contains any of the invalid patterns
    return !invalidPatterns.some((pattern) => name.includes(pattern));
  };

  return (
    <div className="ingredients">
      {isLoading ? ( // Conditional rendering based on loading state
        <div>Loading...</div>
      ) : (
        <>
          <Alert
            type="success"
            messages={["Click on ingredient card to view nutrient details."]}
          />
          {ingredients.map((ingredient) => (
            <div className="ingredients-card" key={ingredient.id}>
              <Link to={`/ingredients/${ingredient.id}`}>
                <img
                  src={
                    ingredient.image
                      ? "https://spoonacular.com/cdn/ingredients_100x100/" +
                        ingredient.image
                      : ingredientImg
                  }
                  alt={ingredient.name}
                />
                <h3>{ingredient.name}</h3>
              </Link>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Ingredients;
