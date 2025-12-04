import React, {useEffect, useState} from 'react'
import {LuCirclePlus} from "react-icons/lu";
import customBarChart from "../Charts/CustomBarChart.jsx";
import {prepareIncomeBarChartData} from "../../utils/helper.js";
import CustomBarChart from "../Charts/CustomBarChart.jsx";

const IncomeOverview = ({transactions, onAddIncome}) => {

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () => {}
    },[transactions])
    return ( <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Income Overview</h5>
                <p className='mt-0.5'>Track your earnings over time and analyze your income trends</p>
            </div>

            <button className='add-btn' onClick={onAddIncome}>
                <LuCirclePlus className='text-lg'/> Add Income
            </button>
        </div>

            <div className='mt-10'>
                <CustomBarChart data={chartData} />
            </div>

    </div>
    )
}
export default IncomeOverview
