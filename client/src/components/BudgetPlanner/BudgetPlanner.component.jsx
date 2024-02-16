import React, { useEffect, useState } from "react";
import "./BudgetPlanner.styles.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "../BudgetForm/BudgetForm.component";
import { fetchAllBudgets, getExpense } from "../../api";
import { CATEGORY, MONTH } from "../../constants/constant";








/*
  FLOW OF DATA TRANSFORMATION
  in useEffect:
  const budgetData = [
    {
      month: "JANUARY",
      monthlyBudget: 1000,
      budgets: [{ amount: 600, category: "FOOD" }, { amount: 200, category: "TRAVEL" }, { amount: 200, category: "ENTERTAINMENT" }]
    },
    {
      month: "FEBRUARY",
      monthlyBudget: 1570,
      budgets: [{ amount: 1000, category: "FOOD" }, { amount: 500, category: "CLOTHING" }, {amount:70, category:ENTERTAINMENT}]
    },
    {
      month: "MARCH",
      monthlyBudget: 2300,
      budgets: [{ amount: 300, category: "FOOD" },{ amount: 1500, category: "CLOTHING" }, { amount: 500, category: "OTHER" }]
    }
  ];

  const expenses = [
    January expenses
    { uuid: 1, month: "JANUARY", transaction: { title: "Pizza", amount: 70, category: "FOOD" } },
    { uuid: 2, month: "JANUARY", transaction: { title: "Sri Lanka", amount: 110, category: "TRAVEL" } },
    { uuid: 3, month: "JANUARY", transaction: { title: "Samosa", amount: 10, category: "FOOD" } },
    { uuid: 4, month: "JANUARY", transaction: { title: "Burger", amount: 80, category: "FOOD" } },
    { uuid: 5, month: "JANUARY", transaction: { title: "Movie Tickets", amount: 50, category: "ENTERTAINMENT" } },

    February expenses
    { uuid: 6, month: "FEBRUARY", transaction: { title: "Jeans", amount: 100, category: "CLOTHING" } },
    { uuid: 7, month: "FEBRUARY", transaction: { title: "T-shirt", amount: 50, category: "CLOTHING" } },
    { uuid: 8, month: "FEBRUARY", transaction: { title: "Pizza", amount: 70, category: "FOOD" } },
    { uuid: 9, month: "FEBRUARY", transaction: { title: "Movie Tickets", amount: 50, category: "ENTERTAINMENT" } },

    March expenses
    { uuid: 10, month: "MARCH", transaction: { title: "Gadgets", amount: 200, category: "OTHER" } },
    { uuid: 11, month: "MARCH", transaction: { title: "Shoes", amount: 100, category: "CLOTHING" } },
    { uuid: 12, month: "MARCH", transaction: { title: "Pizza", amount: 70, category: "FOOD" } },

  ];



  EXPENSES AFTER getMonthlyCategorySpending(expenses)

  {
  "JANUARY": {
    "FOOD": 240,
    "TRAVEL": 110,
    "ENTERTAINMENT": 50
  },
  "FEBRUARY": {
    "CLOTHING": 150,
    "FOOD": 70,
    "ENTERTAINMENT": 50
  },
  "MARCH": {
    "OTHER": 200,
    "CLOTHING": 100,
    "FOOD": 70
  }
}

BUDGETS AFTER generateBudgetFlatList(budgetData, monthlyCategorySpendings)
[
  {
    month: "JANUARY",
    amount: 240,
    category: "FOOD",
    categoryBudget: 600,
    monthlyBudget: 1000,
  },
  {
    month: "JANUARY",
    amount: 110,
    category: "TRAVEL",
    categoryBudget: 200,
    monthlyBudget: 1000,
  },
  {
    month: "JANUARY",
    amount: 50,
    category: "ENTERTAINMENT",
    categoryBudget: 200,
    monthlyBudget: 1000,
  },
  {
    month: "FEBRUARY",
    amount: 70,
    category: "FOOD",
    categoryBudget: 1000,
    monthlyBudget: 1570,
  },
  {
    month: "FEBRUARY",
    amount: 150,
    category: "CLOTHING",
    categoryBudget: 500,
    monthlyBudget: 1570,
  },
  {
    month: "FEBRUARY",
    amount: 50,
    category: "ENTERTAINMENT",
    categoryBudget: 70,
    monthlyBudget: 1570,
  },
  {
    month: "MARCH",
    amount: 70,
    category: "FOOD",
    categoryBudget: 300,
    monthlyBudget: 2300,
  },
  {
    month: "MARCH",
    amount: 100,
    category: "CLOTHING",
    categoryBudget: 1500,
    monthlyBudget: 2300,
  },
  {
    month: "MARCH",
    amount: 200,
    category: "OTHER",
    categoryBudget: 500,
    monthlyBudget: 2300,
  },
];

YEARLY DATA CALC
const yearlyData = [
  {
    category: "FOOD",
    totalBudget: 1900, // 600 + 1000 + 300
    totalSpent: 940 // 240 + 70 + 300 + 70 + 260
  },
  {
    category: "TRAVEL",
    totalBudget: 200, // 200
    totalSpent: 110 // 110
  },
  {
    category: "ENTERTAINMENT",
    totalBudget: 320, // 200 + 70 + 50
    totalSpent: 120 // 50 + 70
  },
  {
    category: "CLOTHING",
    totalBudget: 2000, // 500 + 1500
    totalSpent: 220 // 100 + 70 + 50
  },
  {
    category: "OTHER",
    totalBudget: 500, // 500
    totalSpent: 200 // 200
  }
];


MONTH = JANUARY
const yearlyData = [
  {
    category: "FOOD",
    totalBudget: 600,
    totalSpent: 380 // 70 + 110 + 10 + 80 + 110
  },
  {
    category: "TRAVEL",
    totalBudget: 200,
    totalSpent: 110
  },
  {
    category: "ENTERTAINMENT",
    totalBudget: 200,
    totalSpent: 50
  },
  {
    category: "CLOTHING",
    totalBudget: 0,
    totalSpent: 0 // No expenses for clothing in January
  },
  {
    category: "OTHER",
    totalBudget: 0,
    totalSpent: 0 // No expenses for other in January
  }
];




*/

function BudgetPlanner({ expenses }) {


  const [budgetsFlatList, setBudgetsFlatList] = useState([]);
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

    console.log("monthlyData", monthlyData);

    return monthlyData;
  }


  const generateBudgetFlatList = (budgetData, monthlyCategorySpendings) => {
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

    return budgetList;
  }

  useEffect(() => {
    const getBudgets = async () => {


      const expenseResponse = await getExpense();
      const budgetResponse = await fetchAllBudgets();

      const expenseData = expenseResponse.data;
      const budgetData = budgetResponse.data;

      console.log("expense:", expenseData, "budget:", budgetData)


      const monthlyCategorySpendings = getMonthlyCategorySpending(expenseData);
      let budgetList = generateBudgetFlatList(budgetData, monthlyCategorySpendings);

      
      setBudgetsFlatList(budgetList);
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
        ? budgetsFlatList.filter((item) => item.category === category)
        : budgetsFlatList.filter(
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
    console.log(totalSpent, totalBudget);
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