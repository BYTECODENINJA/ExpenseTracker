import React from 'react'

const InfoCard = ({icon, label, value, color}) => {
    return <div className="flex gap-6 bg-[#43506c] p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50">
        <div className={`w-14 h-14 flex items-center justify-center text-[26px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}
        </div>
        <div>
            <h6 className="text-2xl text-[#FFBF18] mb-1">{label}</h6>
            <span className="text-[20px] text-[#E9E9EB]">Ksh{value}</span>
        </div>
    </div>

}
export default InfoCard
