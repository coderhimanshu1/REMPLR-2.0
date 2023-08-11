import { useState, useContext } from "react";
import RemplrApi from "../helper/api";
import UserContext from "../routes/common/userContext";

export const useSaveIngredient = (ingredientId) => {
  const [isSaved, setIsSaved] = useState(false);
  const { currentUser } = useContext(UserContext);

  const handleIngredientSave = async () => {
    await RemplrApi.saveIngredient(currentUser.username, ingredientId);
    setIsSaved(true);
  };

  return { isSaved, handleIngredientSave };
};
