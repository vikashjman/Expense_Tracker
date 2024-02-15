import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { CATEGORY, MONTH } from "../../../constants/constant";
import { capFirst } from "../../../utils/generateExpense.utils";

function TransactionModal(props) {
    // Destructuring props to get the newExpense state, handleChangeExpense and handleAddExpense functions
    const { newExpense, handleChangeExpense, handleAddExpense } = props;

    // Function to handle click event of the Add button
    const onClickHandler = () => {
        props.onHide(); // Hide the modal
        handleAddExpense(); // Add the new expense
    };

    return (
        <Modal
            backdrop="static"
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add New Expense
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="grid-example">
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <select
                                value={newExpense.category}
                                name="category"
                                onChange={(e) => handleChangeExpense(e)}
                            >
                                {/* Mapping categories to dropdown options */}
                                {Object.values(CATEGORY).map(cat => <option value={cat}>{cat}</option>)} 
                            </select>
                        </Col>
                        <Col xs={12} md={8}>
                            <input
                                name="title"
                                value={newExpense.title}
                                type="text"
                                id="label"
                                placeholder="Description"
                                onChange={(e) => handleChangeExpense(e)}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs={6} md={6}>
                            <input
                                type="number"
                                id="expenses"
                                placeholder="expenses ₹"
                                name="amount"
                                value={newExpense.amount}
                                onChange={(e) => handleChangeExpense(e)}
                            />
                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col xs={6} md={4}>
                            <select
                                name="month"
                                value={newExpense.month}
                                onChange={(e) => handleChangeExpense(e)}
                            >
                                {/* Mapping months to dropdown options */}
                                {Object.values(MONTH).map((mon) => <option value={mon}>{capFirst(mon)}</option>)}
                            </select>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                {/* Add button with click handler */}
                <Button
                    onClick={(e) => {
                        onClickHandler(e);
                    }}
                >
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default TransactionModal;