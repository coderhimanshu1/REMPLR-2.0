import { useState, useContext, useEffect } from "react";
import RemplrApi from "../helper/api";
import UserContext from "../routes/common/userContext";

export const useSaveRecipe = (recipe) => {
  const [isSaved, setIsSaved] = useState(false);
  const [recipeNotFound, setRecipeNotFound] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        // Check if the recipe is saved
        const savedRecipes = await RemplrApi.getUserSavedRecipes(
          currentUser.username
        );
        const found = savedRecipes.some(
          (savedRecipe) => savedRecipe.id === recipe.id
        );

        setIsSaved(found);
      } catch (error) {
        if (error.statusText === "Not Found") {
          setRecipeNotFound(true);
        }
      }
    };

    checkIfSaved();
  }, [recipe, currentUser]);

  const handleRecipeSave = async () => {
    if (!isSaved) {
      await RemplrApi.saveRecipe(currentUser.username, recipe);
      setIsSaved(true);
    }
  };

  return { isSaved, handleRecipeSave, recipeNotFound }; // Returning the new state
};
