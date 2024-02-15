// Importing necessary libraries and components
import TransactionModal from "./TransactionModal/TransactionModal.component"; // Component for the transaction modal
import React, { useState } from "react"; // Importing useState hook from React
import Button from "react-bootstrap/Button"; // Importing Button component from react-bootstrap

// AddTransaction component
const AddTransaction = (props) => {
    // State for controlling the visibility of the modal
    const [modalShow, setModalShow] = useState(false);



    // Destructuring props to get the newExpense state, handleAddExpense and handleChangeExpense functions that is passed down from Homepage.page.jsx
    const { newExpense, handleAddExpense, handleChangeExpense } = props;

    // Render the AddTransaction component
    return (
        <>
            {/* Button to open the modal */}
            <Button
                className="btn"
                variant="primary"
                onClick={() => setModalShow(true)} // Set modalShow to true when button is clicked
            >
                Add
            </Button>

            {/* TransactionModal component */}
            <TransactionModal
                newExpense={newExpense} // Pass newExpense state as prop
                handleAddExpense={handleAddExpense} // Pass handleAddExpense function as prop
                handleChangeExpense={handleChangeExpense} // Pass handleChangeExpense function as prop
                show={modalShow} 
                onHide={() => setModalShow(false)} 
            />
        </>
    );
};

// Export the AddTransaction component
export default AddTransaction;