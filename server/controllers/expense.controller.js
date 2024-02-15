const Expense = require("../models/expense.model");

exports.getExpense = async (req, res) => {
  try {
    const expense = await Expense.find();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.getExpenseByMonth = async (req, res) => {
  try {
    const expense = await Expense.find();
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await Expense.findOneAndDelete({ uuid: id });
    return res.json({ message: "Deleted Sucessfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.postExpense = async (req, res) => {
  try {
    const newExpense = new Expense(req.body);
    await newExpense.save();
    res.status(201).json({ data: newExpense });
  } catch (error) {
    res.status(500).send(error.message);
  }
};


exports.clearAllData = async (req,res)=>{
  try {
    const response = await Expense.deleteMany({});
    
    return res.json({message:"Deleted Succesfully!", response})
  } catch (error) {
    res.status(500).send(error.message);
  }
}