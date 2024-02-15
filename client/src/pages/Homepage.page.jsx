import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { deleteExpense, postExpense } from "../api";
import { CATEGORY } from "../constants/constant";

import Cards from "../components/TransactionCards/TransactionCard.component";
import ChartsView from "../components/ChartsView/ChartsView.component";
import BudgetPlanner from "../components/BudgetPlanner/BudgetPlanner.component";
import Nav from "../components/Navbar/SideNav.component";
import TopNav from "../components/Navbar/TopNav.component";
import AddTransaction from '../components/AddTransaction/AddTransaction.component'


const Homepage = () => {
    /* 
        This is the inital state for newExpense state
        newExpense State: it will be passed down inside to  AddTransaction Component
        From Where it will passed down Transaction Modal
        Where 

        it is used to handle the form state for new Transaction

        three complementary function will also be used or passed to handle the effects.
        #handleChange, #handleAdd, handleDeleteExpense
    */
    const initialState = {
        month: "JANUARY",
        title: "",
        amount: 0,
        category: "FOOD",
    };
    const [newExpense, setnewExpense] = useState(initialState);
    const [expenses, setExpenses] = useState([]);
    const [searchText, setSearchText] = useState("");
 
    const handleAddExpense = async (e) => {
        // It will create a payload from the newExpense state to send to backend
        // which follow the mongodb schema structure in backend
        const payload = {
            uuid: uuidv4(),
            month: newExpense.month,
            transaction: {
                title: newExpense.title,
                amount: newExpense.amount,
                category: newExpense.category,
            },
        };
        // This function encapsulate the AXIOS post request call to backend for transefer
        // TODO: add tryCatch
        await postExpense(payload); //dB post
        // This new resets the newExpense initial State
        setnewExpense(initialState); // state update
        // This new update the expenses list
        setExpenses([...expenses, payload]);
    };

    const handleChangeExpense = (e) => {
        const { name, value } = e.target;


        // So, every input field have a name given, which matches with property of newExpense state
        // so, we can identify the value that comming from event.target is 
        // from which input and change that inputs value
        // for furthur clarification see
        setnewExpense({ ...newExpense, [name]: value });
    };

    const handleDeleteExpense = async (id) => {
        const updatedExpenses = expenses.filter((expense) => expense.uuid !== id);
        setExpenses(updatedExpenses);
        await deleteExpense(id);
    };

    

    



    return (
        <div className="App row container-fluid p-0">
            <div className="col-lg-2 col-12 p-0" >
                <Nav />
            </div>
            <div className="col-lg-10 col-12 ">
                <div className="row container-fluid  p-0">
                    <TopNav />
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
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </Col>
                                <Col xs="auto">
                                    <AddTransaction
                                        newExpense={newExpense}
                                        handleAddExpense={handleAddExpense}
                                        handleChangeExpense={handleChangeExpense}
                                    />
                                </Col>
                            </Row>
                        </Form>
                        <Cards
                            searchText={searchText}
                            expenses={expenses}
                            setExpenses={setExpenses}
                            handleDeleteExpense={handleDeleteExpense}
                        />
                    </div>
                    <div
                        className="col-lg-6 col-12"
                        style={{ height: "90vh", overflowY: "scroll", paddingTop: "30px" }}
                    >
                        <div className="row">
                            <BudgetPlanner expenses={expenses} />
                        </div>
                        <div className="row" style={{ paddingTop: "10px" }}>
                            <ChartsView
                                expenses={expenses}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;