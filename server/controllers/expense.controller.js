const Expense = require("../models/expense.model"); // Importing Expense model
const asyncHandler = require("../utils/asyncHandler.utils"); // Importing asyncHandler middleware

/**
 * Get all expenses.
 * @returns {Function} Middleware function for handling route.
 */
exports.getExpense = asyncHandler(async (req, res) => {
  // Fetch all expenses from the database
  const expense = await Expense.find();
  // Send response with status 200 and JSON data containing expenses
  res.status(200).json(expense);
});

/**
 * Get expenses by month.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Function} Middleware function for handling route.
 */
exports.getExpenseByMonth = asyncHandler(async (req, res) => {
  // Extract month parameter from request
  const { month } = req.params;
  // Find expenses for the specified month from the database
  const expense = await Expense.find({ month: month });
  // Send response with status 200 and JSON data containing expenses for the specified month
  res.status(200).json(expense);
});

/**
 * Delete an expense by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Function} Middleware function for handling route.
 */
exports.deleteExpense = asyncHandler(async (req, res) => {
  // Extract ID parameter from request
  const { id } = req.params;
  // Find and delete the expense with the specified UUID
  await Expense.findOneAndDelete({ uuid: id });
  // Send response with status 200 and success message
  res.status(200).json({ message: "Deleted Successfully!" });
});

/**
 * Create a new expense.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Function} Middleware function for handling route.
 */
exports.postExpense = asyncHandler(async (req, res) => {
  // Create a new Expense object with data from request body
  const newExpense = new Expense(req.body);
  // Save the new expense to the database
  await newExpense.save();
  // Send response with status 201 and JSON data containing the newly created expense
  res.status(201).json({ data: newExpense });
});
