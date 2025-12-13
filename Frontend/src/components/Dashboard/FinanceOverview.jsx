import React from 'react'
import CustomPieChart from "../Charts/CustomPieChart.jsx";

const COLORS = ["#875cf5", "#FA2C37", "#FF6900"]

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {

    const balanceData = [
        { name: "Total Balance", Amount: totalBalance },
        { name: "Total Income", Amount: totalIncome },
        { name: "Total Expense", Amount: totalExpense },
    ]
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className='text-xl'>Financial Overview</h5>
            </div>

            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`Ksh${totalBalance}`}
                colors={COLORS}
                showTextAnchor
            />
        </div>
    )
}
export default FinanceOverview

