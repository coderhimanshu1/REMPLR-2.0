import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import RemplrApi from "../../helper/api";
import "../../styles/ingredients/ingredients.css";
import Alert from "../common/alert";
import IngredientCard from "./ingredientCard";
import UserContext from "../common/userContext";
import LoadingScreen from "../common/loading";

const Ingredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!currentUser) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await RemplrApi.getIngredients();
        // Filtering only valid ingredients based on their name
        const validIngredients = response.ingredients.filter((ingredient) =>
          isValidName(ingredient.name)
        );
        setIngredients(validIngredients);
      } catch (error) {
        console.error("Failed to fetch recipes", error);
      } finally {
        setIsLoading(false);
      }
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
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <Alert
            type="success"
            messages={[
              "Click on ingredient card to view ingredient's nutritional information.",
            ]}
          />
          <div className="ingredients">
            {ingredients.map((ingredient) => (
              <Link to={`/ingredients/${ingredient.id}`}>
                <IngredientCard ingredient={ingredient} />
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Ingredients;
