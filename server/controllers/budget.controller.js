const Budget = require("../models/budget.model"); // Importing Budget model
const asyncHandler = require("../utils/asyncHandler.utils"); // Importing asyncHandler middleware

/**
 * Get all budgets.
 * @returns {Function} Middleware function for handling route.
 */
exports.getBudget = asyncHandler(async (req, res) => {
  // Fetch all budgets from the database
  const budget = await Budget.find();
  // Send response with status 200 and JSON data containing budgets
  res.status(200).json(budget);
});

/**
 * Get budgets by month.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Function} Middleware function for handling route.
 */
exports.getBudgetByMonth = asyncHandler(async (req, res) => {

  // Extract month parameter from request
  const { month } = req.params;
  // Find budgets for the specified month from the database
  const budget = await Budget.find({ month: month });
  // Send response with status 200 and JSON data containing budgets for the specified month
  res.status(200).json(budget);
});

/**
 * Update or create budget.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Function} Middleware function for handling route.
 */
exports.updateOrCreateBudget = asyncHandler(async (req, res) => {
  // Extract necessary data from request body
  const { month, monthlyBudget, newItem } = req.body;

  // Find existing budget for the specified month
  const existingBudget = await Budget.findOne({ month });

  if (existingBudget) {
    // If existing budget is found, update it
    if (monthlyBudget) existingBudget.monthlyBudget = monthlyBudget;

    // Check if the category already exists in the budget
    const categoryIndex = existingBudget.budgets.findIndex(item => item.category === newItem.category);
    if (categoryIndex !== -1) {
      // If category exists, update its amount
      existingBudget.budgets[categoryIndex].amount = newItem.amount;
    } else {
      // If category does not exist, add it to the budget
      existingBudget.budgets.push(newItem);
    }

    // Save the updated budget
    await existingBudget.save();
  } else {
    // If no existing budget is found, create a new one
    const budget = new Budget({
      month,
      monthlyBudget: monthlyBudget,
      budgets: [newItem],
    });
    // Save the new budget
    await budget.save();
  }

  // Send response with status 200 and success message
  res.status(200).json({ message: "Updated Successfully!" });
});
