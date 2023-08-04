// useSaveIngredient.js
import { useState } from "react";
import RemplrApi from "../helper/api";

export const useSaveIngredient = (ingredientId) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleIngredientSave = async () => {
    const username = "exampleUser";
    await RemplrApi.saveIngredient(username, ingredientId);
    setIsSaved(true);
  };

  return { isSaved, handleIngredientSave };
};
