const daysOfWeek = [
  "",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const MealDays = () => {
  return (
    <>
      {daysOfWeek.map((day) => (
        <th key={day}>{day}</th>
      ))}
    </>
  );
};

export default MealDays;
