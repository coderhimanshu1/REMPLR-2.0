import { useState } from "react";
import "../../styles/mealplans/mealType.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Modal from "./modal";
import Recipes from "../recipes/recipes";

const MealType = ({ type, handleDeleteClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [clickedDay, setClickedDay] = useState(null);

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

  return (
    <>
      {" "}
      <tr className="meal-row">
        <td className="meal-type">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </td>
        {daysOfWeek.map((day, index) => (
          <td
            className="meal-cell"
            key={day}
            id={`${prefix}-${index}`}
            onClick={() => {
              setClickedDay(day);
              setIsModalOpen(true);
            }}
          >
            {selectedRecipe && clickedDay === day ? selectedRecipe.title : ""}
          </td>
        ))}
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
          setClickedDay(null);
        }}
      >
        <Recipes
          showAddButton={true}
          handleAddRecipe={(recipe) => {
            setSelectedRecipe(recipe);
            setIsModalOpen(false);
            setClickedDay(null);
          }}
        />
      </Modal>
    </>
  );
};

export default MealType;
