import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../common/alert";
import "../../styles/mealplans/mealplan.css";
import RemplrApi from "../../helper/api";

const MealPlan = () => {
  const [mealPlan, setMealPlan] = useState({});
  console.log(mealPlan);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await RemplrApi.getMealPlan();
        setMealPlan(result.mealPlan);
      } catch (err) {
        console.error("Error fetching saved meal plans:", err);
      }
    };

    fetchData();
  }, []);
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
