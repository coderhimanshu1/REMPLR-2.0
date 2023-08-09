import { useState } from "react";
import "../../styles/mealplans/mealType.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./modal";
import Recipes from "../recipes/recipes";
import RecipeCard from "../recipes/recipeCard";

const MealType = ({
  type,
  handleDeleteClick,
  setRecipesForCells,
  recipesForCells,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [clickedCell, setClickedCell] = useState(null);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const typePrefixMap = {
    breakfast: "b",
    lunch: "l",
    dinner: "d",
    snack: "s",
  };

  const prefix = typePrefixMap[type];

  const removeRecipeFromCell = (cellId) => {
    setRecipesForCells((prev) => {
      const updatedRecipes = { ...prev };
      delete updatedRecipes[cellId];
      return updatedRecipes;
    });
  };

  return (
    <>
      <tr className="meal-row">
        <td className="meal-type">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </td>
        {daysOfWeek.map((day, index) => {
          const cellId = `${prefix}-${index}`;
          return (
            <td
              className="meal-cell"
              key={day}
              id={cellId}
              onClick={() => {
                setClickedCell(cellId);
                setIsModalOpen(true);
              }}
            >
              {recipesForCells[cellId] && (
                <div className="recipe-container">
                  <RecipeCard recipe={recipesForCells[cellId]} />
                  <button onClick={() => removeRecipeFromCell(cellId)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
              )}
            </td>
          );
        })}
        <button
          className={`${type}-button`}
          onClick={() =>
            handleDeleteClick(
              `show${type.charAt(0).toUpperCase() + type.slice(1)}`
            )
          }
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </tr>
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setClickedCell(null);
        }}
      >
        <Recipes
          showAddButton={true}
          handleAddRecipe={(recipe) => {
            setRecipesForCells((prevRecipes) => ({
              ...prevRecipes,
              [clickedCell]: recipe,
            }));
            setSelectedRecipe(recipe);
            setIsModalOpen(false);
          }}
        />
      </Modal>
    </>
  );
};

export default MealType;
