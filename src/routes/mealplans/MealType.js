import "../../styles/mealplans/mealType.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MealType = ({ type, handleDeleteClick }) => {
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
    <tr className="meal-row">
      <td className="meal-type">
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </td>
      {daysOfWeek.map((day, index) => (
        <td className="meal-cell" key={day} id={`${prefix}-${index}`}></td>
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
  );
};

export default MealType;
