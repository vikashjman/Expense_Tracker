import TransactionModal from "./TransactionModal/TransactionModal.component";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const AddTransaction = (props) => {
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

            <TransactionModal
                newExpense={newExpense}
                handleAdd={handleAdd}
                handleChange={handleChange}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default AddTransaction;