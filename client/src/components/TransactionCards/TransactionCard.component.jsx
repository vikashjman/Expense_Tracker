import React, { useEffect } from "react"; // Importing React and useEffect hook
import "./TransactionCard.styles.css"; // Importing CSS file for styling
import { getExpense } from "../../api"; // Importing API function to fetch expenses

// Importing category images
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
    MEDICAL: Medical,
    OTHER: Others,
    GROCERIES: GROCERIES,
    ENTERTAINMENT: entertainment
  };

  // Destructuring props
  const { expenses, handleDeleteExpense, setExpenses, searchText } = props;

  /**
   * useEffect hook to fetch expenses from the backend when the component mounts.
   * Sets the fetched expenses to the state.
   */
  useEffect(() => {
    /**
     * Fetches expenses from the backend.
     */
    const fetchExpenses = async () => {
      try {
        const expenseData = await getExpense(); // Fetch expenses from the backend
        setExpenses(expenseData.data); // Update expenses state
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses(); // Call the fetchExpenses function
  }, [setExpenses]); // Dependency array to ensure useEffect runs only once

  return (
    <div className="expenseBody">
      {/* Mapping through expenses and filtering based on searchText */}
      {expenses
        .filter((exp) =>
          exp.transaction.title.toLowerCase().includes(searchText.toLowerCase().trim())
        )
        .map((expense, index) => (
          <div key={index} className="expenseCard">
            {/* Displaying expense icon */}
            <img
              className="expenseIcon"
              src={categoryImageMap[expense.transaction.category]}
              alt="image"
            />
            {/* Displaying expense title */}
            <label className="expenseTitle" key={index}>
              {expense.transaction.title}
            </label>
            {/* Displaying expense amount */}
            <label className="expenseAmount" key={index}>
              {expense.transaction.amount}
            </label>

            {/* Button to delete the expense */}
            <button onClick={() => handleDeleteExpense(expense.uuid)}>
              Delete
            </button>
          </div>
        ))}
    </div>
  );
}

export default TransactionCard; // Exporting TransactionCard component
