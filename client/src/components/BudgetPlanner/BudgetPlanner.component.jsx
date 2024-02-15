import React, { useEffect, useState } from "react";
import "./BudgetPlanner.styles.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "../BudgetForm/BudgetForm.component";
import { fetchAllBudgets, getExpense } from "../../api";
import { CATEGORY, MONTH } from "../../constants/constant";
import { capFirst } from "../../utils/generateExpense.utils";

/**
 * Component to manage budget planning and display budget completion progress.
 * @param {Object} props - Component props.
 * @param {Array} props.expenses - List of expenses.
 * @returns {JSX.Element} - BudgetPlanner component.
 */
function BudgetPlanner({ expenses }) {
  // State to store budget data
  const [budget, setBudget] = useState([]);

  /**
   * Function to calculate monthly spending for each category.
   * @param {Array} transactions - List of expense transactions.
   * @returns {Object} - Object containing monthly spending data for each category.
   */
  function getMonthlyCategorySpending(transactions) {
    const monthlyData = {};

    transactions.forEach((transaction) => {
      const {
        month,
        transaction: { category, amount },
      } = transaction;

      if (!monthlyData[month]) {
        monthlyData[month] = {};
      }

      if (!monthlyData[month][category]) {
        monthlyData[month][category] = 0;
      }

      monthlyData[month][category] += amount;
    });

    return monthlyData;
  }

  // Fetching budget and expense data from API on component mount
  useEffect(() => {
    const getBudgets = async () => {
      // Fetching expense data
      const expenseResponse = await getExpense();
      const expenseData = expenseResponse.data;

      // Fetching budget data
      const budgetResponse = await fetchAllBudgets();
      const budgetData = budgetResponse.data;

      // Calculating monthly spending for each category
      const monthlyCategorySpendings = getMonthlyCategorySpending(expenseData);
      let budgetList = [];

      // Processing budget data to match with monthly spending
      budgetData.forEach((bud) => {
        const { month, monthlyBudget, budgets } = bud;

        budgets.forEach(({ amount, category }) => {
          const monthlySpending = monthlyCategorySpendings[month];
          if (monthlySpending && monthlySpending[category] !== undefined) {
            const data = {
              month: month,
              amount: monthlyCategorySpendings[month][category],
              category: category,
              categoryBudget: amount,
              monthlyBudget: monthlyBudget,
            };

            budgetList.push(data);
          }
        });
      });

      // Setting budget state with processed data
      setBudget(budgetList);
    };

    getBudgets();
  }, []);

  // List of expense categories
  const categories = Object.values(CATEGORY);

  // State to manage selected month for budget planning
  const [selectedMonth, setSelectedMonth] = useState("Yearly");

  // State to manage modal visibility
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to handle month change in budget planning
  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  // Function to calculate total budget and total spent for each category for the selected period
  const yearlyData = categories.map((category) => {
    const categoryData =
      selectedMonth === "Yearly"
        ? budget.filter((item) => item.category === category)
        : budget.filter(
            (item) => item.category === category && item.month === selectedMonth
          );
    const totalBudget = categoryData.reduce(
      (acc, item) => acc + item.categoryBudget,
      0
    );
    const totalSpent = categoryData.reduce((acc, item) => acc + item.amount, 0);
    return { category, totalBudget, totalSpent };
  });

  // Function to calculate completion percentage for a category
  const calculateCompletionPercentage = (totalSpent, totalBudget) => {
    return Math.round((totalSpent / totalBudget) * 100) || 0;
  };

  return (
    <div className="budget-container">
      {/* Overall budget completion progress */}
      <div className="overall-budget">
        <label className="budget-title">Overall Budget Completion</label>
        <div className="progress-container">
          <progress
            id="overall-progress"
            value={calculateCompletionPercentage(
              yearlyData.reduce((acc, { totalSpent }) => acc + totalSpent, 0),
              yearlyData.reduce((acc, { totalBudget }) => acc + totalBudget, 0)
            )}
            max="100"
          >
            {calculateCompletionPercentage(
              yearlyData.reduce((acc, { totalSpent }) => acc + totalSpent, 0),
              yearlyData.reduce((acc, { totalBudget }) => acc + totalBudget, 0)
            )}
            %
          </progress>
          <span className="completion">
            {calculateCompletionPercentage(
              yearlyData.reduce((acc, { totalSpent }) => acc + totalSpent, 0),
              yearlyData.reduce((acc, { totalBudget }) => acc + totalBudget, 0)
            )}
            %
          </span>
        </div>
        {/* Button to open budget planner modal */}
        <Button onClick={handleShow} className="budget-button">
          Budget Planner
        </Button>
      </div>

      {/* Dropdown to select month for budget planning */}
      <div className="selectorDiv">
        <select
          className="form-select"
          onChange={handleMonthChange}
          value={selectedMonth}
        >
          <option value="Yearly">Yearly</option>
          {Object.values(MONTH).map((month) => (
            <option month={month}>{capFirst(month)}</option>
          ))}
        </select>
      </div>

      {/* Category-wise budget completion progress */}
      <div className="category-budgets">
        {yearlyData.map(({ category, totalSpent, totalBudget }, index) => (
          <div key={index} className="category">
            <label className="category-label">{category}</label>
            <div className="progress-container">
              <progress
                className="category-progress"
                value={calculateCompletionPercentage(totalSpent, totalBudget)}
                max="100"
              >
                {calculateCompletionPercentage(totalSpent, totalBudget)}%
              </progress>
              <span className="completion">
                {calculateCompletionPercentage(totalSpent, totalBudget)}%
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Budget planner modal */}
      <Modal backdrop="static" centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Budget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default BudgetPlanner;


/*
{
      month: "January",
      amount: 220,
      category: "Education",
      categoryBudget: 10000,
      monthlyBudget: 400000,
    },
    {
      month: "May",
      amount: 220,
      category: "Education",
      categoryBudget: 10000,
      monthlyBudget: 420000,
    },
    {
      month: "November",
      amount: 220,
      category: "Food",
      categoryBudget: 10000,
      monthlyBudget: 450000,
    },

*/