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
    let result = await RemplrApi.createMealPlan(formData);
    if (result.errors) {
      setFormErrors(result.errors);
    }
  };

  return (
    <div className="mealplanner">
      <h1>Meal Plan Creator</h1>
      <MealPlannerSteps />
      <div className="mealplanner-start">
        <button onClick={handleClick}>Create Meal Plan</button>
      </div>
      <div className="mealplanner-area">
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

        <div>
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
    </div>
  );
};

export default MealPlanner;
