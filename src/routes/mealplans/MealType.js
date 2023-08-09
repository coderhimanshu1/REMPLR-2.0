const MealType = ({ type }) => {
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
    <tr>
      <td>{type.charAt(0).toUpperCase() + type.slice(1)}</td>
      {daysOfWeek.map((day, index) => (
        <td key={day} id={`${prefix}-${index}`}>
          +
        </td>
      ))}
      <button>x</button>
    </tr>
  );
};

export default MealType;
