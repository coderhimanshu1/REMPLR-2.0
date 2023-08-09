const MealPlannerSteps = () => {
  return (
    <div className="mealplanner-steps">
      <p>Step 1: Start by Clicking on Create Meal Plan</p>
      <p>
        Step 2: Give a name to your meal plan. Enter your username to confirm
        the name and click on start adding recipes to meal plan.
      </p>
      <p>
        Step 3: Now, You have the basic structure of Meal Planner. Start by
        adding the meal plan row type with the help of associated button
        (Breakfast/ Lunch/ Dinner/ Snack ).
        <small>
          <i> Note: To remove specific row, hover to see the remove button.</i>
        </small>
      </p>
      <p>Step 4: Click on specific cell and you will the recipe area</p>
      <p>Step 5: Select the recipe which meet your client's requirement.</p>
      <p>
        Step 6: Want to change the recipe? Hover to see the remove button and
        add the new recipe by following Step 3 and 4.
        <small>
          <i> NOTE: You may two recipes for a meal of the day.</i>
        </small>
      </p>
      <p>
        Step 7: Once you are done satisfied with the meal plan. Click Save to
        Save the Meal Plan.
        <small>
          <i>
            {" "}
            NOTE: You will see this saved meal plan in your saved meal plans.
          </i>
        </small>
      </p>
    </div>
  );
};

export default MealPlannerSteps;
