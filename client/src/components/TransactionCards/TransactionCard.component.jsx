import React, { useEffect } from "react";
import "./TransactionCard.styles.css";
import { getExpense } from "../../api";


import Travel from "../../images/Travel.png";
import FOOD from "../../images/Food.png";
import Medical from "../../images/Medical.png"
import Others from "../../images/Others.png"
import GROCERIES from "../../images/Shopping.png"
import entertainment from "../../images/entertainment.png"
import Education from "../../images/Education.png";

function TransactionCard(props) {
  // Map each category to its corresponding image
  const categoryImageMap = {
    EDUCATION: Education,
    FOOD: FOOD,
    TRAVEL: Travel,
    MEDICAL : Medical,
    OTHER : Others,
    GROCERIES : GROCERIES,
    ENTERTAINMENT : entertainment

  };

  const { expenses, handleDeleteExpense, setExpenses, searchText } = props;
  useEffect(() => {
    const getExpenseData = async () => {
      const expenseData = await getExpense();
      setExpenses(expenseData.data);
    };
    getExpenseData();
  }, []);
  return (
    <div className="expenseBody">
      {/* <AddNew
        newExpense={newExpense}
        handleAdd={handleAdd}
        handleChange={handleChange}
      /> */}
      {expenses
        .filter((exp) =>
        exp.transaction.title.toLowerCase().includes(searchText.toLowerCase().trim())
        )
        .map((expense, index) => (
          <div key={index} className="expenseCard">
            <img
              className="expenseIcon"
              src={categoryImageMap[expense.transaction.category]}
              alt="image"
            />
            <label className="expenseTitle" key={index}>
              {" "}
              {expense.transaction.title}
            </label>
            <label className="expenseAmount" key={index}>
              {" "}
              {expense.transaction.amount}
            </label>

            <button onClick={() => handleDeleteExpense(expense.uuid)}>
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default TransactionCard;
