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
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.deleteExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const expense = await Expense.findById(req.params.id);
        
        if (!expense) {
            return res.status(404).json({message: "Expense not found"});
        }
        
        if (expense.userId.toString() !== userId) {
            return res.status(403).json({message: "Not authorized to delete this expense"});
        }
        
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
        } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;

    try{
        const expense = await Expense.find({userId}).sort({date: -1});

        //Prepare data for excel sheet
        const data = expense.map((item)=> ({
            Category: item.category,
            Amount: item.amount,
            Date: item.date,
        }));

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expense Excel");
        
        const buffer = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=expense_details.xlsx');
        res.send(buffer);
    } catch (error) {
        res.status(500).json({message: "Server error"});
    }
};