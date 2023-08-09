import React, { useState } from "react";
import "../../styles/mealplans/mealplanner.css";
import MealDays from "./mealDays";
import MealType from "./MealType";

const MealPlanner = () => {
  const [mealTypes, setMealTypes] = useState({
    showMealDays: false,
    showBreakfast: false,
    showLunch: false,
    showDinner: false,
    showSnack: false,
  });

  const handleClick = () => {
    setMealTypes((prevState) => ({ ...prevState, showMealDays: true }));
  };

  const handleMealTypeClick = (type) => {
    setMealTypes((prevState) => ({ ...prevState, [type]: true }));
  };

  const handleResetClick = () => {
    setMealTypes((prevState) => ({
      showMealDays: false,
      showBreakfast: false,
      showLunch: false,
      showDinner: false,
      showSnack: false,
    }));
  };

  return (
    <div className="mealplanner">
      <h1>Meal Plan Creator</h1>
      <div className="mealplanner-steps">
        <p>Step 1: Start by Clicking on Create Meal Plan</p>
        <p>
          Step 2: Now, You have the basic structure of Meal Planner. Start by
          adding the meal plan row type with the help of associated button
          (Breakfast/ Lunch/ Dinner/ Snack ).
          <small>
            <i>
              {" "}
              Note: To remove specific row, hover to see the remove button.
            </i>
          </small>
        </p>
        <p>Step 3: Click on specific cell and you will the recipe area</p>
        <p>Step 4: Select the recipe which meet your client's requirement.</p>
        <p>
          Step 5: Want to change the recipe? Hover to see the remove button and
          add the new recipe by following Step 3 and 4.
          <small>
            <i> NOTE: You may two recipes for a meal of the day.</i>
          </small>
        </p>
        <p>
          Step 6: Once you are done satisfied with the meal plan. Click Save to
          Save the Meal Plan.
          <small>
            <i>
              {" "}
              NOTE: You will see this saved meal plan in your saved meal plans.
            </i>
          </small>
        </p>
      </div>

      <button onClick={handleClick}>Create Meal Plan</button>

      <div className="mealplanner-area">
        <table>
          <thead>{mealTypes.showMealDays && <MealDays />}</thead>
          <tbody>
            {mealTypes.showBreakfast && <MealType type="breakfast" />}
            {mealTypes.showLunch && <MealType type="lunch" />}
            {mealTypes.showDinner && <MealType type="dinner" />}
            {mealTypes.showSnack && <MealType type="snack" />}
          </tbody>
        </table>
      </div>
      {mealTypes.showMealDays && (
        <div className="mealplanner-button-area">
          <div>
            <button onClick={() => handleResetClick()}>Reset</button>
          </div>
          <div>
            <button onClick={() => handleMealTypeClick("showLunch")}>
              Lunch
            </button>
            <button onClick={() => handleMealTypeClick("showBreakfast")}>
              Breakfast
            </button>
            <button onClick={() => handleMealTypeClick("showDinner")}>
              Dinner
            </button>
            <button onClick={() => handleMealTypeClick("showSnack")}>
              Snack
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
