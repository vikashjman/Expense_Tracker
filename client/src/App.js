import "./App.css";
import { deleteExpense, postExpense } from "./api";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Cards from "./components/Cards";
import { ChartsView } from "./components/ChartsView";
import BudgetPlanner from "./components/BudgetPlanner";
import Nav from "./components/Nav";
import TopNav from "./components/TopNav";
import { AddNew } from "./components/AddNew";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { CATEGORY } from "./constants/constant";
const Homepage = () => {
  const initialState = {
    month: "JANUARY",
    title: "",
    amount: 0,
    category: "FOOD",
  };
  const [newExpense, setnewExpense] = useState(initialState);
  const [expenses, setExpenses] = useState([]);

  const handleAdd = async (e) => {
    const payload = {
      uuid: uuidv4(),
      month: newExpense.month,
      transaction: {
        title: newExpense.title,
        amount: newExpense.amount,
        category: newExpense.category,
      },
    };
    await postExpense(payload); //dB post
    setnewExpense(initialState); // state update
    setExpenses([...expenses, payload]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setnewExpense({ ...newExpense, [name]: value });
    console.log(newExpense);
  };

  const handleDeleteExpense = async (id) => {
    // if(!id) return;
    console.log("Handle Delete", id);
    const updatedExpenses = expenses.filter((expense) => expense.uuid !== id);
    setExpenses(updatedExpenses);
    await deleteExpense(id);
  };

  const generateYearlyExpense = () => {
    const monthlyTotals = {
      january: 0,
      february: 0,
      march: 0,
      april: 0,
      may: 0,
      june: 0,
      july: 0,
      august: 0,
      september: 0,
      october: 0,
      november: 0,
      december: 0,
    };

    expenses.forEach((exp) => {
      const monthKey = exp.month.toLowerCase();
      if (monthKey in monthlyTotals) {
        monthlyTotals[monthKey] += parseInt(exp.transaction.amount) || 0;
      }
    });

    return Object.values(monthlyTotals);
  };

  const getMonthlyCategoryExpense = (month) => {
    let categorySpent = {};

    const newExpense = expenses.filter((exp) => exp.month === month);

    Object.values(CATEGORY).forEach((cat) => {
      categorySpent[cat] = 0;
    });

    newExpense.forEach(({ transaction }) => {
      const { category, amount } = transaction;
      if (categorySpent.hasOwnProperty(category)) {
        categorySpent[category] += parseInt(amount) || 0;
      }
    });
    return Object.values(categorySpent);
  };

  // Search State & it's function
  const [searchText, setSearchText] = useState("");
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
            <Form inline style={{paddingBottom:"10px"}}>
              <Row style={{display:"flex", justifyContent:"space-between", paddingLeft:"20px", paddingRight:"30px"}}>
                <Col xs="auto">
                  <Form.Control
                    style={{width:"300px", borderStyle:"solid"}}
                    type="text"
                    placeholder="Search"
                    className=" mr-sm-2"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </Col>
                <Col xs="auto">
                  <AddNew
                    newExpense={newExpense}
                    handleAdd={handleAdd}
                    handleChange={handleChange}
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
                getMonthlyCategoryExpense={getMonthlyCategoryExpense}
                generateYearlyExpense={generateYearlyExpense}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
    </Routes>
  );
}

export default App;
