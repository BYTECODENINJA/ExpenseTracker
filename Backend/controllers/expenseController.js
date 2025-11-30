const xlsx = require("xlsx");
const Expense = require("../models/Expense");


//add expense source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const {icon, category, amount, date} = req.body;

        //Check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({msg: 'Please enter all fields'});
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};

//get all expense
exports.getAllExpense = async (req, res) => {

    const userId = req.user.id;

    try {
        const expense = await Expense.find({userId}).sort({date: -1});
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
        } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Income.find({userId}).sort({date: -1});

        //Prepare data for excel sheet
        const data = expense.map((item)=> ({
            Category: item.Category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense Excel");
        xlsx.writeFile(wb, "expense_details.xlsx");
        res.download("expense_details.xlsx");
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};