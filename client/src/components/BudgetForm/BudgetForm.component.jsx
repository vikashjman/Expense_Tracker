import { useEffect, useState } from "react";
import React from "react";

import { fetchAllBudgets, postBudget } from "../../api"; // Importing API functions for fetching and posting budgets
import { CATEGORY } from "../../constants/constant"; // Importing category constant for dropdown options
import { percentToVal, valToPercent } from "../../utils/generateExpense.utils"; // Importing utility functions for conversion

/**
 * Component for creating and submitting budget plans.
 * @returns {JSX.Element} - Form component.
 */
function Form() {
  // State to manage selected month for budget planning
  const [monthly, setMonthly] = useState("");
  // State to manage monthly budget amount
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  // State to manage selected category for budget planning
  const [category, setCategory] = useState("");
  // State to manage category budget percentage
  const [categoryPercent, setCategoryPercent] = useState(0);
  // State to store existing budgets
  const [budgets, setBudgets] = useState({});

  // Fetching existing budgets from the server
  useEffect(() => {
    const get_all_budget = async () => {
      try {
        // Fetching all budgets from the server
        const response = await fetchAllBudgets();
        // Setting the budgets state with the fetched data
        setBudgets(response.data);
      } catch (error) {
        console.error("Error fetching budgets:", error);
      }
    };
    // Calling the function to fetch budgets when the component mounts
    get_all_budget();
  }, []);

  // Handler for changing the selected month
  const handleMonthlyChange = (e) => {
    // Getting the selected value from the event
    const value = e.target.value;
    // Setting the selected month
    setMonthly(value);
    // Finding the index of the selected month in the budgets array
    const index = budgets.findIndex((ele) => ele.month === value);

    // If the selected month is found
    if (index !== -1) {
      // Setting the monthly budget to the budget of the selected month
      const preBudget = budgets[index].monthlyBudget;
      setMonthlyBudget(preBudget);
      // Finding the index of the selected category in the budgets of the selected month
      const budgetIndex = budgets[index].budgets.findIndex(
        (ele) => ele.category === category
      );
      // If the selected category is found
      if (budgetIndex !== -1) {
        // Setting the category percentage to the percentage of the category's budget compared to the monthly budget
        const preCatVal = budgets[index].budgets[budgetIndex].amount;
        setCategoryPercent(valToPercent(preCatVal, preBudget));
      } else {
        // If the selected category is not found, setting the category percentage to 0
        setCategoryPercent(0);
      }
    } else {
      // If the selected month is not found, setting the monthly budget and category percentage to 0
      setMonthlyBudget(0);
      setCategoryPercent(0);
    }
  };

  // Handler for changing the monthly budget amount
  const handleMonthlyBudget = (e) => {
    // Setting the monthly budget amount based on the user input
    setMonthlyBudget(e.target.value);
  };

  // Handler for submitting the budget plan
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      month: monthly,
      monthlyBudget: monthlyBudget,
      newItem: {
        amount: percentToVal(categoryPercent, monthlyBudget),
        category: category,
      },
    };

    try {
      // Posting the budget plan to the server
      await postBudget(payload);

      // Copying the existing budgets array
      const updatedBudgets = [...budgets];
      // Finding the index of the existing budget for the selected month
      const existingBudgetIndex = updatedBudgets.findIndex(
        (budget) => budget.month === monthly
      );

      // If the existing budget for the selected month is found
      if (existingBudgetIndex !== -1) {
        // Updating the existing budget with the new budget plan
        const existingBudget = updatedBudgets[existingBudgetIndex];
        if (monthlyBudget) existingBudget.monthlyBudget = monthlyBudget;

        // Finding the index of the selected category within the existing budget
        const categoryIndex = existingBudget.budgets.findIndex(
          (item) => item.category === category
        );
        // If the selected category is found within the existing budget
        if (categoryIndex !== -1) {
          // Updating the category amount with the new budget plan
          existingBudget.budgets[categoryIndex].amount = payload.newItem.amount;
        } else {
          // If the selected category is not found within the existing budget, adding it to the budget
          existingBudget.budgets.push(payload.newItem);
        }

        // Updating the existing budget within the budgets array
        updatedBudgets[existingBudgetIndex] = existingBudget;
      } else {
        // If there is no existing budget for the selected month, adding the new budget plan to the budgets array
        updatedBudgets.push({
          month: monthly,
          monthlyBudget: monthlyBudget,
          budgets: [payload.newItem],
        });
      }

      // Setting the budgets state with the updated budgets array
      setBudgets(updatedBudgets);
      // Resetting the form fields after submission
      setMonthly("");
      setMonthlyBudget(0);
      setCategory("");
      setCategoryPercent(0);
    } catch (error) {
      console.error("Error submitting budget:", error);
    }
  };

  // Handler for changing the selected category
  const handleCategoryChange = (e) => {
    // Getting the selected category from the event
    const newCat = e.target.value;
    // Setting the selected category
    setCategory(newCat);
    // Finding the index of the selected month in the budgets array
    const index = budgets.findIndex((ele) => ele.month === monthly);

    // If the selected month is found
    if (index !== -1) {
      // Finding the index of the selected category within the budgets of the selected month
      const budgetIndex = budgets[index].budgets.findIndex(
        (ele) => ele.category === newCat
      );
      // If the selected category is found within the budgets of the selected month
      if (budgetIndex !== -1) {
        // Setting the category percentage to the percentage of the category's budget compared to the monthly budget
        const preCatVal = budgets[index].budgets[budgetIndex].amount;
        setCategoryPercent(valToPercent(preCatVal, monthlyBudget));
      } else {
        // If the selected category is not found within the budgets of the selected month, setting the category percentage to 0
        setCategoryPercent(0);
      }
    } else {
      // If the selected month is not found, setting the category percentage to 0
      setCategoryPercent(0);
    }
  };

  return (
    <div className="budget-form-container">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="legend">Budget Form</legend>
          {/* Dropdown to select the month */}
          <div className="form-group">
            <label htmlFor="disabledSelect" className="form-label">
              Overall Monthly Budget
            </label>
            <select
              name="monthly"
              value={monthly}
              id="disabledSelect"
              className="form-select"
              onChange={handleMonthlyChange}
            >
              <option value="" hidden>Select category</option>
              {/* Mapping through months */}
              {Object.values(CATEGORY).map((val) => (
                <option key={val} value={val}>
                  {val.toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          {/* Input field for entering monthly budget amount */}
          <div className="form-group">
            <label htmlFor="disabledTextInput" className="form-label">
              Total Amount
            </label>
            <input
              value={monthlyBudget}
              type="number"
              id="disabledTextInput"
              className="form-control"
              placeholder="Enter expense description"
              onChange={handleMonthlyBudget}
            />
          </div>
          {/* Dropdown to select the category */}
          <div className="form-group">
            <label htmlFor="disabledSelect" className="form-label">
              Expense Category
            </label>
            <select
              name="category"
              value={category}
              id="disabledSelect"
              className="form-select"
              onChange={handleCategoryChange}
            >
              <option value="" hidden>Select category</option>
              {/* Mapping through categories */}
              {Object.values(CATEGORY).map((val) => (
                <option key={val} value={val}>
                  {val.toLowerCase()}
                </option>
              ))}
            </select>
          </div>
          {/* Input field for entering expense percentage */}
          <div className="form-group">
            <label htmlFor="disabledTextInput" className="form-label">
              Expense Percentage
            </label>
            <input
              type="number"
              min="1"
              max="100"
              id="myPercent"
              className="form-control"
              value={categoryPercent}
              onChange={(e) => {
                setCategoryPercent(e.target.value);
              }}
            />
          </div>
          {/* Button to submit the budget plan */}
          <div style={{ marginTop: "10px" }}>
            <center>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </center>
          </div>
        </fieldset>
      </form>
    </div>
  );
}

export default Form;
