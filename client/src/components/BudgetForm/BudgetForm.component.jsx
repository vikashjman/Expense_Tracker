import { useEffect, useState } from "react";

import React from "react";
import { fetchAllBudgets, postBudget } from "../../api";
import { CATEGORY } from "../../constants/constant";

function Form() {
  const [monthly, setMonthly] = useState("");
  const [monthlyBudget, setMonthlyBudget] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryPercent, setCategoryPercent] = useState(0);
  const [budgets, setBudgets] = useState({});

  useEffect(() => {
    const get_all_budget = async () => {
      const response = await fetchAllBudgets();
      setBudgets(response.data);
    };
    get_all_budget();
  }, []);

  const percentToVal = (percent, total) => {
    return (percent * total) / 100;
  }
  const valToPercent = (val, total) => {

    if (isNaN(total) || total === 0) {
      return 0;
    }
    if (isNaN(val)) {
      return 0;
    }
    return Math.round((val / total) * 100);
  };

  const handleMonthlyChange = (e) => {
    const value = e.target.value;
    setMonthly(value);
    const index = budgets.findIndex((ele) => ele.month === value);

    if (index !== -1) {
      const preBudget = budgets[index].monthlyBudget;
      setMonthlyBudget(preBudget);
      const budgetIndex = budgets[index].budgets.findIndex(ele => ele.category === category);
      if (budgetIndex !== -1) {
        const preCatVal = budgets[index].budgets[budgetIndex].amount;
        setCategoryPercent(valToPercent(preCatVal, preBudget))
      } else {
        setCategoryPercent(0)
      }
    } else {
      setMonthlyBudget(0);
      setCategoryPercent(0);
    }
  };

  const handleMonthlyBudget = (e) => {
    setMonthlyBudget(e.target.value);
  };





  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      month: monthly,
      monthlyBudget: monthlyBudget,
      newItem: {
        amount: percentToVal(categoryPercent, monthlyBudget),
        category: category,
      }
    }
  
    try {
      await postBudget(payload);
  
      const updatedBudgets = [...budgets];
      const existingBudgetIndex = updatedBudgets.findIndex(budget => budget.month === monthly);
  
      if (existingBudgetIndex !== -1) {
        const existingBudget = updatedBudgets[existingBudgetIndex];
        if (monthlyBudget) existingBudget.monthlyBudget = monthlyBudget;
  
        const categoryIndex = existingBudget.budgets.findIndex(item => item.category === category);
        if (categoryIndex !== -1) {
          existingBudget.budgets[categoryIndex].amount = payload.newItem.amount;
        } else {
          existingBudget.budgets.push(payload.newItem);
        }
  
        updatedBudgets[existingBudgetIndex] = existingBudget;
      } else {
        updatedBudgets.push({
          month: monthly,
          monthlyBudget: monthlyBudget,
          budgets: [payload.newItem],
        });
      }
  
      setBudgets(updatedBudgets);
      setMonthly("");
      setMonthlyBudget(0);
      setCategory("");
      setCategoryPercent(0);
  
      console.log("Budget submitted successfully and state updated.");
    } catch (error) {
      console.error("Error submitting budget:", error);
    }
  }
  


  const handleCategoryChange = (e) => {
    const newCat = e.target.value;
    setCategory(newCat)
    const index = budgets.findIndex((ele) => ele.month === monthly);


    if (index !== -1) {
      const budgetIndex = budgets[index].budgets.findIndex(ele => ele.category === newCat);
      console.log("budget", budgetIndex)
      if (budgetIndex !== -1) {
        const preCatVal = budgets[index].budgets[budgetIndex].amount;
        setCategoryPercent(valToPercent(preCatVal, monthlyBudget))
      }
      else {
        setCategoryPercent(0)
      }
    } else {
      setCategoryPercent(0);
    }



  }



  return (
    <div className="budget-form-container">
      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="legend">Budget Form</legend>
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
              <option value="">Select category</option>
              <option value="JANUARY">January</option>
              <option value="FEBRUARY">February</option>
              <option value="MARCH">March</option>
              <option value="APRIL">April</option>
              <option value="MAY">May</option>
              <option value="JUNE">June</option>
              <option value="JULY">July</option>
              <option value="AUGUST">August</option>
              <option value="SEPTEMBER">September</option>
              <option value="OCTOBER">October</option>
              <option value="NOVEMBER">November</option>
              <option value="DECEMBER">December</option>
            </select>
          </div>
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
              <option value="">Select category</option>
              {Object.values(CATEGORY).map((val) => <option key={val} value={val}>{val.toLowerCase()}</option>)}
            </select>
          </div>
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

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Form;
