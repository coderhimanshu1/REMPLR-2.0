// useSaveRecipe.js
import { useState } from "react";
import RemplrApi from "../helper/api";

export const useSaveRecipe = (RecipeId) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleRecipeSave = async () => {
    const username = "exampleUser";
    await RemplrApi.saveRecipe(username, RecipeId);
    setIsSaved(true);
  };

  return { isSaved, handleRecipeSave };
};
