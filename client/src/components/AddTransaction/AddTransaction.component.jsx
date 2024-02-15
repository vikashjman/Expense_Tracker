import TransactionModal from "./TransactionModal/TransactionModal.component";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const AddTransaction = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const { newExpense, handleAddExpense, handleChangeExpense } = props;

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
                handleAddExpense={handleAddExpense}
                handleChangeExpense={handleChangeExpense}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
};

export default AddTransaction;