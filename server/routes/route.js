const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense.controller");
const budgetController = require("../controllers/budget.controller");
const userController = require("../controllers/user.controller");
const { protect } = require("../middleware/authMiddleware");

router.get("/expense", expenseController.getExpense);
router.get("/expense/:month", expenseController.getExpenseByMonth);
router.post("/expense", expenseController.postExpense);
router.delete("/expense/:id", expenseController.deleteExpense);

router.get("/budget", budgetController.getBudget);
router.get("/budget/:month", budgetController.getBudgetByMonth);
router.post("/budget", budgetController.updateOrCreateBudget);

router.post("/user",protect, userController.signup)
router.post("/user/auth",protect,userController.signin)
router.post("/logout",protect, userController.logout)

module.exports = router;
