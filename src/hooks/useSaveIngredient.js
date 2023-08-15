import { useState, useContext, useEffect } from "react";
import RemplrApi from "../helper/api";
import UserContext from "../routes/common/userContext";

export const useSaveIngredient = (ingredient) => {
  const [isSaved, setIsSaved] = useState(false);
  const [ingredientNotFound, setIngredientNotFound] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        // Check if the ingredient is saved
        const savedIngredients = await RemplrApi.getUserSavedIngredients(
          currentUser.username
        );

        const found = savedIngredients.some(
          (savedIngredient) => savedIngredient.id === ingredient.id
        );
        setIsSaved(found);
      } catch (error) {
        if (error.statusText === "Not Found") {
          setIngredientNotFound(true);
        }
      }
    };

    checkIfSaved();
  }, [ingredient, currentUser]);

  const handleIngredientSave = async () => {
    try {
      if (!isSaved) {
        await RemplrApi.saveIngredient(currentUser.username, ingredient.id);
        setIsSaved(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { isSaved, handleIngredientSave, ingredientNotFound }; // Returning the new state
};
