import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from 'recharts';
import customTooltip from "./CustomTooltip.jsx";

const CustomBarChart = ({data}) => {

    //Function to alternate colors
    const getBarColor = (index) => {
        return index % 2 === 0 ? '#8884d8' : '#82ca9d';
    }

    const CustomTooltip = ({active, payload}) => {
        if(active && payload && payload.length){
            return (
                <div className="bg-white p-2 rounded-md shadow-lg">
                <p className='text-xl font-semibold text-gray-900'>{payload[0].payload.category}</p>
                <p className='text-sm text-gray-600'>
                    Amount: <span className='text-sm font-medium text-gray-950'>Ksh{payload[0].payload.amount}</span>
                </p>
            </div>
            )
        }
        return null;
    }
    return (
        <div className="bg-white mt-6">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke='none'/>
                    <XAxis dataKey="month" tick={{fontSize: 12, fill: '#8884d8'}} stroke='none'/>
                    <YAxis tick={{fontSize: 12, fill: '#8884d8'}} stroke='none'/>
                    <Tooltip content={customTooltip}/>
                    <Legend />
                    <Bar dataKey="amount" fill='#ff8042'
                    radius={[10, 10, 0, 0]}/>

                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(index)}/>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default CustomBarChart
