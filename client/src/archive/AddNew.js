import React from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Modal from "react-bootstrap/Modal";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { CATEGORY, MONTH } from "../constants/constant";

function MydModalWithGrid(props) {
  const { newExpense, handleChange, handleAdd } = props;
  const onClickHandler = () => {
    props.onHide();
    handleAdd();
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
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
                onChange={(e) => handleChange(e)}
              />
            </Col>
            
          </Row>
          <br />
          <Row>
            <Col xs={6} md={4}>
              <select
                name="month"
                value={newExpense.month}
                onChange={(e) => handleChange(e)}
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

export const AddNew = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const { newExpense, handleAdd, handleChange } = props;

  return (
    <>
      <Button
        className="btn"
        variant="primary"
        onClick={() => setModalShow(true)}
      >
        Add
      </Button>

      <MydModalWithGrid
        newExpense={newExpense}
        handleAdd={handleAdd}
        handleChange={handleChange}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
};
