const Income = require("../models/Income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

//Dashboaed data
exports.getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(userId);

        //Fetch total income and expenses
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, totalIncome: { $sum: "$amount" } } },
        ]);

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, totalExpense: { $sum: "$amount" } } },
        ]);

        //Get income transaction in the last 60 days
        const last60DaysIncomeTransactions = await Income.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        const last30DaysExpenseTransactions = await Expense.find({
            userId: userObjectId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
        }).sort({ date: -1 });

        //Get expense transaction in the last 60 days
        const incomeLast60Days = last60DaysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );
        //Get expense transaction in the last 30 days
        const expensesLast30Days = last30DaysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        );

        //Fetch last 5 transactions (income and expenses)
        const lastTransactions = [
            ...(await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "income",
                })
            ),
            ...(await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)).map(
                (txn) => ({
                    ...txn.toObject(),
                    type: "expense",
                })
            )
        ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);//sort latest first

        //Final Response
        res.json({
            totalBalance:
                (totalIncome[0]?.totalIncome || 0) - (totalExpense[0]?.totalExpense || 0),
            totalIncome: totalIncome[0]?.totalIncome || 0,
            totalExpense: totalExpense[0]?.totalExpense || 0,
            last30DaysExpenses: {
                total: expensesLast30Days,
                transactions: last30DaysExpenseTransactions,
            },
            last60DaysIncome: {
                total: incomeLast60Days,
                transactions: last60DaysIncomeTransactions,
            },
            recentTransactions: lastTransactions,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error", error });
    }
}