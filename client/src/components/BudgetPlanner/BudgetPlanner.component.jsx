import React, { useEffect, useState } from "react";
import "./BudgetPlanner.styles.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "../BudgetForm/BudgetForm.component";
import { fetchAllBudgets, getExpense } from "../../api";
import { CATEGORY, MONTH } from "../../constants/constant";



function BudgetPlanner({ expenses }) {
  const [budget, setBudget] = useState([]);

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

  useEffect(() => {
    const getBudgets = async () => {


      const expenseResponse = await getExpense();
      const budgetResponse = await fetchAllBudgets();

      const expenseData = expenseResponse.data;
      const budgetData = budgetResponse.data;

  
      const monthlyCategorySpendings = getMonthlyCategorySpending(expenseData);
      let budgetList = [];

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

      setBudget(budgetList);
    };

    getBudgets();
  }, []);

  const categories = Object.values(CATEGORY);

  const [selectedMonth, setSelectedMonth] = useState("Yearly");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Function to calculate total budget and total spent for each category for the whole year
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

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  return (
    <div className="budget-container">
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
        {/* <button className="budget-button">Budget Planner</button> */}
        <Button onClick={handleShow} className="budget-button">
          Budget Planner
        </Button>
      </div>
      <div className="selectorDiv">
        <select
          className="form-select"
          onChange={handleMonthChange}
          value={selectedMonth}
        >
          <option value="Yearly">Yearly</option>
          {Object.values(MONTH).map((month) => (
            <option month={month}>{month}</option>
          ))}
        </select>
      </div>
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
      {/*  */}
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
