import React, { useState, useEffect } from "react";
import MealItem from "../components/Meals/MealItem";
import "./MealsPage.css";

const MealsPage = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch("http://localhost:3001/meals");
      const data = await response.json();
      setMeals(data);
    };
    fetchMeals();
  }, []);

  return (
    <div className="meals-page">
      <h1>Food Order</h1>
      <h2>Available Meals</h2>
      <div className="meals-list">
        {meals.map((meal) => (
          <MealItem key={meal.id} meal={meal} />
        ))}
      </div>
    </div>
  );
};

export default MealsPage;
