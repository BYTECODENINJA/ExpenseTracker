import React from 'react'
import {PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend} from 'recharts';
import CustomTooltip from "./CustomTooltip.jsx";
import CustomLegend from "./CustomLegend.jsx";

const CustomPieChart = ({data, label, colors, showTextAnchor, totalAmount}) => {
    return <ResponsiveContainer width="100%" height={380}>
        <PieChart>
            <Pie
                data={data}
                dataKey="Amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={130}
                innerRadius={100}
                labelLine={false}
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]}/>
                        ))}
            </Pie>
            <Tooltip content={CustomTooltip}/>
            <Legend content={CustomLegend}/>

            {showTextAnchor && (
                <>
                    <text x="50%" y="50%" dy={-25} textAnchor="middle" fontSize="20px" fill="#8884d8">{label}</text>
                    <text x="50%" y="50%" dy={8} textAnchor="middle" fontSize={30} fill="#4f48ec">{totalAmount}</text>
                </>
            )}
        </PieChart>
    </ResponsiveContainer>
}
export default CustomPieChart
