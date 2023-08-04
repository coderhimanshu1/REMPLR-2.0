import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RemplrApi from "../../helper/api";
import "../../styles/ingredients/ingredients.css";
import Alert from "../common/alert";
import IngredientCard from "./ingredientCard";

const Ingredients = () => {
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
            messages={[
              "Click on ingredient card to view ingredient's nutritional information.",
            ]}
          />
          {ingredients.map((ingredient) => (
            <Link to={`/ingredients/${ingredient.id}`}>
              <IngredientCard ingredient={ingredient} />
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default Ingredients;
