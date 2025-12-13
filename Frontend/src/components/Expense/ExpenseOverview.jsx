import React, { useEffect, useState } from 'react';
import { LuCirclePlus } from "react-icons/lu";
import CustomBarChart from "../Charts/CustomBarChart.jsx";
import { prepareExpenseBarChartData } from "../../utils/helper.js";
import moment from "moment";

const ExpenseOverview = ({ transactions, onAddExpense }) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareExpenseBarChartData(transactions);
        setChartData(result);

        return () => { }
    }, [transactions])
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div>
                    <h5 className='text-lg'>Expense Overview</h5>
                    <p className='mt-0.5'>Track your spending over time and analyze your expense trends</p>
                </div>
                <button className='add-btn' onClick={onAddExpense}>
                    <LuCirclePlus className='text-lg' /> Add Expense
                </button>
            </div>
            <div className='mt-10'>
                <CustomBarChart data={chartData} />
            </div>
            {/* Transaction List */}
            {transactions && transactions.length > 0 && (
                <div className='mt-6'>
                    <h6 className='text-md font-semibold mb-2'>Recent Expenses</h6>
                    <ul className='space-y-2'>
                        {transactions.slice(0, 5).map((txn) => (
                            <li key={txn._id} className='flex justify-between'>
                                <span>{txn.category || 'Unnamed'}</span>
                                <span>{txn.amount}</span>
                                <span>{moment(txn.date).format('DD MMM YYYY')}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default ExpenseOverview

