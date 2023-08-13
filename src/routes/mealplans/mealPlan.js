import Alert from "../common/alert";
import "../../styles/mealplans/mealplan.css";

const MealPlan = () => {
  return (
    <div className="mealplan">
      <div className="mealplan-alert">
        <Alert
          type="error"
          messages={["Visit later to view specific meal plan details."]}
        />
      </div>
    </div>
  );
};

export default MealPlan;
