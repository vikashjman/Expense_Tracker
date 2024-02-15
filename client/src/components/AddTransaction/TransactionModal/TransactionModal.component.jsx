import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { CATEGORY, MONTH } from "../../../constants/constant";
function TransactionModal(props) {
    const { newExpense, handleChangeExpense, handleAddExpense } = props;
    const onClickHandler = () => {
        props.onHide();
        handleAddExpense();
    };



    return (
        <Modal
            backdrop="static"
            style={{ justifyContent: "space-between" }}
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
                                {Object.values(MONTH).map((mon) => <option value={mon}>{mon}</option>)}
                            </select>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
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