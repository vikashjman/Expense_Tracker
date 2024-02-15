const Budget = require("../models/budget.model");

exports.getBudget = async (req, res) => {
  try {
    const budget = await Budget.find();
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getBudgetByMonth = async (req, res) => {
  try {
    const { month } = req.params;
    const budget = await Budget.find({ month: month });
    res.status(201).json(budget);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.postBudget = async (req, res) => {
  const { month, monthlyBudget, monthBudges } = req.body;
};

exports.updateOrCreateBudget = async (req, res) => {
  const { month, monthlyBudget, newItem } = req.body;

  const existingBudget = await Budget.findOne({ month });

  if (existingBudget) {
    if (monthlyBudget) existingBudget.monthlyBudget = monthlyBudget;

    const categoryIndex = existingBudget.budgets.findIndex(
      (item) => item.category === newItem.category
    );
    if (categoryIndex !== -1) {
      existingBudget.budgets[categoryIndex].amount = newItem.amount;
    } else {
      existingBudget.budgets.push(newItem);
    }

    await existingBudget.save();
  } else {
    const budget = new Budget({
      month,
      monthlyBudget: monthlyBudget,
      budgets: [newItem],
    });
    await budget.save();
  }

  res.status(200).json({ message: "Updated Successfully!" });
};
