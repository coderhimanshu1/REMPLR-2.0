import React, { useState } from "react";
import "../../styles/mealplans/mealplanner.css";
import MealDays from "./mealDays";
import MealType from "./MealType";
import Alert from "../common/alert";
import RemplrApi from "../../helper/api";
import MealPlannerSteps from "./mealPlannerSteps";

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
  const [recipesForCells, setRecipesForCells] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((l) => ({ ...l, [name]: value }));
  };

  const handleStartClick = () => {
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
      showMealPlanName: false,
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

    const recipes = [];
    for (const [cellId, recipe] of Object.entries(recipesForCells)) {
      const [mealType, dayIndex] = cellId.split("-");
      recipes.push({
        recipe_id: recipe.id,
        meal_type: mealType,
        meal_day: Number(dayIndex) + 1,
      });
    }

    const dataToSend = {
      ...formData,
      recipes,
    };

    try {
      let result = await RemplrApi.createMealPlan(dataToSend);
      console.log("result", result);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mealplanner">
      <h1>Meal Plan Creator</h1>
      <MealPlannerSteps />
      <div className="mealplanner-start">
        <button onClick={handleStartClick}>Create Meal Plan</button>
      </div>
      <div className="mealplanner-area">
        <table>
          <thead>{mealTypes.showMealDays && <MealDays />}</thead>
          <tbody>
            {mealTypes.showBreakfast && (
              <MealType
                type="breakfast"
                handleDeleteClick={handleDeleteClick}
                recipesForCells={recipesForCells}
                setRecipesForCells={setRecipesForCells}
              />
            )}
            {mealTypes.showLunch && (
              <MealType
                type="lunch"
                handleDeleteClick={handleDeleteClick}
                recipesForCells={recipesForCells}
                setRecipesForCells={setRecipesForCells}
              />
            )}
            {mealTypes.showDinner && (
              <MealType
                type="dinner"
                handleDeleteClick={handleDeleteClick}
                recipesForCells={recipesForCells}
                setRecipesForCells={setRecipesForCells}
              />
            )}
            {mealTypes.showSnack && (
              <MealType
                type="snack"
                handleDeleteClick={handleDeleteClick}
                recipesForCells={recipesForCells}
                setRecipesForCells={setRecipesForCells}
              />
            )}
          </tbody>
        </table>

        {mealTypes.showMealDays && (
          <div className="mealplanner-button-area">
            <div className="mealplanner-reset">
              <button onClick={() => handleResetClick()}>Reset</button>
            </div>
            <div className="mealplanner-meals">
              <button
                className="mealplanner-breakfast-button"
                onClick={() => handleMealTypeClick("showBreakfast")}
              >
                Breakfast
              </button>
              <button
                className="mealplanner-lunch-button"
                onClick={() => handleMealTypeClick("showLunch")}
              >
                Lunch
              </button>

              <button
                className="mealplanner-dinner-button"
                onClick={() => handleMealTypeClick("showDinner")}
              >
                Dinner
              </button>
              <button
                className="mealplanner-snack-button"
                onClick={() => handleMealTypeClick("showSnack")}
              >
                Snack
              </button>
            </div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          {mealTypes.showMealPlanName && (
            <div className="mealplanner-name">
              <input
                type="mealPlanName"
                name="mealPlanName"
                placeholder="Enter meal plan name"
                onChange={handleChange}
                required
              />
              {formErrors.length ? (
                <Alert type="error" messages={formErrors} />
              ) : null}
              <input
                type="username"
                name="created_by"
                placeholder="enter username to confirm"
                onChange={handleChange}
                required
              />
              <button>Save</button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default MealPlanner;
