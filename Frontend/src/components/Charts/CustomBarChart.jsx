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
    Cell
} from "recharts";
import customTooltip from "./CustomTooltip.jsx";

const CustomBarChart = ({data}) => {

    //Function to alternate colors
    const getBarColor = (index) => {
        if (index % 2 === 0) {
            return "#1bbeb1";
        }
        return "#1b8020";
    }

    const customTooltip = ({active, payload}) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[#1a3365] rounded-xl p-2">
                    <p className="text-[#ffbb00] font-bold">{payload[0].payload.category}</p>
                    <p className='text-sm text-gray-600'>
                        Amount: <span className='text-sm font-medium text-gray-900'>Ksh{payload[0].payload.amount}</span>
                    </p>
                </div>
            );
        }
        return null;
    }

    return (
       <div className="bg-[#1a3365] mt-5 rounded-xl">
           <ResponsiveContainer width="100%" height={300}>
               <BarChart data={data}>
                   <CartesianGrid stroke='none'/>

                   <XAxis dataKey="Month" tick={{fill: "#ffbb00"}}/>
                   <YAxis tick={{fill: "#ffbb00"}} stroke='none'/>
                   <Tooltip content={customTooltip}/>
                   <Bar
                       dataKey="Amount"
                       fill="#c7410f"
                       radius={[10, 10, 0, 0]}
                       activeDot={{r: 8, fill: "#1b8020"}}
                       activeStyle={{fill: "#1bbeb1"}}
                   >
                       {data.map((entry, index) => (
                           <Cell key={index} fill={getBarColor(index)}/>
                       ))}
                   </Bar>
               </BarChart>
           </ResponsiveContainer>
       </div>
    )
}
export default CustomBarChart
