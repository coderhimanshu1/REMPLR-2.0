import React, { useState } from "react";
import "../../styles/mealplans/mealplanner.css";
import MealDays from "./mealDays";
import MealType from "./MealType";
import Alert from "../common/alert";
import RemplrApi from "../../helper/api";

const MealPlanner = () => {
  const [mealTypes, setMealTypes] = useState({
    showMealPlanName: false,
    showMealDays: false,
    showBreakfast: false,
    showLunch: false,
    showDinner: false,
    showSnack: false,
  });
  const [formData, setFormData] = useState({
    created_by: "",
    mealPlanName: "",
  });
  const [formErrors, setFormErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((l) => ({ ...l, [name]: value }));
  };

  const handleClick = () => {
    setMealTypes((prevState) => ({
      ...prevState,
      showMealPlanName: true,
      showMealDays: true,
    }));
  };

  const handleMealTypeClick = (type) => {
    setMealTypes((prevState) => ({ ...prevState, [type]: true }));
  };

  const handleResetClick = () => {
    setMealTypes((prevState) => ({
      ...prevState,
      showMealDays: false,
      showBreakfast: false,
      showLunch: false,
      showDinner: false,
      showSnack: false,
    }));
  };

  const handleDeleteClick = (type) => {
    setMealTypes((prevState) => ({ ...prevState, [type]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let result = await RemplrApi.createMealPlan(formData);
    if (result.errors) {
      setFormErrors(result.errors);
    }
  };

  return (
    <div className="mealplanner">
      <h1>Meal Plan Creator</h1>
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
            <i>
              {" "}
              Note: To remove specific row, hover to see the remove button.
            </i>
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

      <div className="mealplanner-start">
        <button onClick={handleClick}>Create Meal Plan</button>
      </div>

      {mealTypes.showMealPlanName && (
        <div className="mealplanner-name">
          <form onSubmit={handleSubmit}>
            <input
              type="mealPlanName"
              name="mealPlanName"
              placeholder="Enter meal plan name"
              onChange={handleChange}
              required
            />
            <input
              type="username"
              name="created_by"
              placeholder="enter username to confirm"
              onChange={handleChange}
              required
            />
            {formErrors.length ? (
              <Alert type="error" messages={formErrors} />
            ) : null}
            <button>Start</button>
          </form>
        </div>
      )}

      <div className="mealplanner-area">
        <table>
          <thead>{mealTypes.showMealDays && <MealDays />}</thead>
          <tbody>
            {mealTypes.showBreakfast && (
              <MealType
                type="breakfast"
                handleDeleteClick={handleDeleteClick}
              />
            )}
            {mealTypes.showLunch && (
              <MealType type="lunch" handleDeleteClick={handleDeleteClick} />
            )}
            {mealTypes.showDinner && (
              <MealType type="dinner" handleDeleteClick={handleDeleteClick} />
            )}
            {mealTypes.showSnack && (
              <MealType type="snack" handleDeleteClick={handleDeleteClick} />
            )}
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
