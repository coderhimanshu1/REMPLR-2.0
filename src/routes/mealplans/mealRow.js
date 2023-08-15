import RenderMealTypeRecipes from "./renderMealTypeRecipes";

const MealRow = ({ transformedData, mealType }) => {
  return (
    <tr>
      <th>Breakfast</th>
      <RenderMealTypeRecipes recipes={transformedData} mealType={mealType} />
    </tr>
  );
};

export default MealRow;
