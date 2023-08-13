import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../common/alert";
import UserContext from "../common/userContext";
import "../../styles/mealplans/userSavedMealPlans.css";
import RemplrApi from "../../helper/api";

function UserSavedMealPlans() {
  const [savedMealPlans, setSavedMealPlans] = useState([]);
  const { token, currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!token) {
    navigate("/login");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await RemplrApi.getMealPlans();
        setSavedMealPlans(result.mealPlans);
      } catch (err) {
        console.error("Error fetching saved meal plans:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="saved-meal-plans">
      <Alert
        type="success"
        messages={["Click on Meal Plan card to see Meal Plan details."]}
      />
      <h1>Your Saved Meal Plans</h1>
      <div className="saved-meal-plans-container">
        {savedMealPlans.map((mealPlan) => (
          <Link to={`/mealplans/${mealPlan.id}`}>
            <div key={mealPlan.id} className="meal-plan-card">
              <h3>{mealPlan.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default UserSavedMealPlans;
