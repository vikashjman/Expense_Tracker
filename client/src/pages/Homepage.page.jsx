// Importing necessary libraries and components
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Library to generate unique identifiers
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Importing API functions and constants
import { deleteExpense, postExpense } from "../api"; // API functions to delete and post expenses

// Importing custom components
import Cards from "../components/TransactionCards/TransactionCard.component";
import ChartsView from "../components/ChartsView/ChartsView.component";
import BudgetPlanner from "../components/BudgetPlanner/BudgetPlanner.component";
import Nav from "../components/Navbar/SideNav.component";
import TopNav from "../components/Navbar/TopNav.component";
import AddTransaction from '../components/AddTransaction/AddTransaction.component'

// Homepage component
const Homepage = () => {
    // Initial state for newExpense. This state will be passed to AddTransaction component
    // and used to handle the form state for new transaction.
    const initialState = {
        month: "JANUARY",
        title: "",
        amount: 0,
        category: "FOOD",
    };
    // State for newExpense and its setter function
    const [newExpense, setnewExpense] = useState(initialState);

    // State for expenses and its setter function, this loaded in TransactionCards Function in useEffect to reload the states using the API Calls
    const [expenses, setExpenses] = useState([]);

    // State for search text and its setter function, this is for the search textfield.
    const [searchText, setSearchText] = useState("");

    // Function to handle adding an expense
    const handleAddExpense = async (e) => {
        // Create a payload from the newExpense state to send to backend
        // which follows the MongoDB schema structure in backend
        const payload = {
            uuid: uuidv4(),
            month: newExpense.month,
            transaction: {
                title: newExpense.title,
                amount: newExpense.amount,
                category: newExpense.category,
            },
        };
        // Encapsulate the AXIOS post request call to backend for transfer
        await postExpense(payload); // Post to database
        // Reset the newExpense to initial state
        setnewExpense(initialState);
        // Update the expenses list
        setExpenses([payload,...expenses]);

        console.log(payload)
    };




    // Function to handle changes in expense
    const handleChangeExpense = (e) => {
        // e.target refers to the form field that triggered the event.
        // Destructuring is used to extract the 'name' and 'value' properties from e.target.
        const { name, value } = e.target;

        // The 'name' corresponds to the name attribute of the form field (e.g., 'title', 'amount', 'category' in the case of TransactionModal)
        // The 'value' corresponds to the current value of the form field.

        // The state of newExpense is updated using the setnewExpense function.
        // A new object is created with the current state of newExpense (using the spread operator '...').
        // Then, the property of this object that matches the 'name' extracted from e.target is updated with the 'value'.
        // This effectively updates the specific field of the newExpense state that the user interacted with in the TransactionModal.
        setnewExpense({ ...newExpense, [name]: value });
    };




    // Function to handle deleting an expense
    const handleDeleteExpense = async (id) => {
        // Filter out the expense to be deleted
        const updatedExpenses = expenses.filter((expense) => expense.uuid !== id);
        // Delete the expense from backend
        await deleteExpense(id);
        // Update the expenses state
        setExpenses(updatedExpenses);
    };

    // Render the Homepage component
    return (
        <div className="App row container-fluid p-0">
            <div className="col-lg-2 col-12 p-0" >
                <Nav /> {/* Side navigation */}
            </div>
            <div className="col-lg-10 col-12 ">
                <div className="row container-fluid  p-0">
                    <TopNav /> {/* Top navigation */}
                </div>
                <div className="row">
                    <div
                        className="col-lg-6 col-12"
                        id="cardsDiv"
                        style={{ paddingTop: "30px" }}
                    >
                        <Form inline style={{ paddingBottom: "10px" }}>
                            <Row style={{ display: "flex", justifyContent: "space-between", paddingLeft: "20px", paddingRight: "30px" }}>
                                <Col xs="auto">
                                    <Form.Control
                                        style={{ width: "300px", borderStyle: "solid" }}
                                        type="text"
                                        placeholder="Search"
                                        className=" mr-sm-2"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)} // Update search text state on change
                                    />
                                </Col>
                                <Col xs="auto">
                                    <AddTransaction
                                        newExpense={newExpense} // Pass newExpense state as prop
                                        handleAddExpense={handleAddExpense} // Pass handleAddExpense function as prop
                                        handleChangeExpense={handleChangeExpense} // Pass handleChangeExpense function as prop
                                    />
                                </Col>
                            </Row>
                        </Form>
                        <Cards
                            searchText={searchText} // Pass searchText state as prop
                            expenses={expenses} // Pass expenses state as prop
                            setExpenses={setExpenses} // Pass setExpenses function as prop
                            handleDeleteExpense={handleDeleteExpense} // Pass handleDeleteExpense function as prop
                        />
                    </div>
                    <div
                        className="col-lg-6 col-12"
                        style={{ height: "90vh", overflowY: "scroll", paddingTop: "30px" }}
                    >
                        <div className="row">
                            <BudgetPlanner  />
                        </div>
                        <div className="row" style={{ paddingTop: "10px" }}>
                            <ChartsView
                                expenses={expenses} // Pass expenses state as prop
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;