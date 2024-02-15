const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller");
const budgetController = require("../controllers/budget.controller");

router.get("/expense", expenseController.getExpense);
router.get("/expense/:month", expenseController.getExpenseByMonth);
router.post("/expense", expenseController.postExpense);
router.delete("/expense/:id", expenseController.deleteExpense);

router.get("/budget", budgetController.getBudget);
router.get("/budget/:month", budgetController.getBudgetByMonth);
router.post("/budget", budgetController.updateOrCreateBudget);

module.exports = router;
