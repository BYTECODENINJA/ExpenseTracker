import React from 'react'
import {LuUtensils,LuTrendingUp,LuTrendingDown,LuTrash2} from "react-icons/lu";

const TransactionInfoCard = ({
    title, icon, date, amount, type, hideDeleteBtn, onDelete}) => {

    const getAmountStyles = () =>
        type === 'income'? 'bg-green-100 text-green-500': 'bg-red-100 text-red-500';

    // Check if icon is an emoji (string) or an image URL
    const isEmoji = (str) => {
        if (!str) return false;
        // Check if it's a URL (starts with http:// or https:// or /)
        if (str.startsWith('http://') || str.startsWith('https://') || str.startsWith('/')) {
            return false;
        }
        // Check if it contains emoji characters (Unicode emoji range)
        const emojiRegex = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]/u;
        return emojiRegex.test(str);
    };

    return <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100">
        <div className="w-12 h-12 flex items-center justify-center text-gray-800 rounded-full bg-gray-200">
            {icon ? (
                isEmoji(icon) ? (
                    <span className="text-2xl">{icon}</span>
                ) : (
                    <img src={icon} alt={title} className="w-6 h-6"/>
                )
            ) : (
               <LuUtensils/>
            )}
        </div>

        <div className='flex-1 flex items-center justify-between'>
            <div>
                <p className='text-gray-800 font-medium'>{title}</p>
                <p className='text-sm text-gray-400 mt-1'>{date}</p>
            </div>

            <div className="flex items-center gap-2">
                {!hideDeleteBtn && (
                    <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    onClick={onDelete}>
                        <LuTrash2 size={18}/>
                    </button>
                    )}
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}>
                    <h6 className="font-medium">
                        {type === 'income'? '+': '-'} Ksh{amount}
                    </h6>
                    {type === 'income'?
                        <LuTrendingUp className='text-green-500'/>
                    :
                        <LuTrendingDown className='text-red-500'/>
                    }
                </div>
            </div>
        </div>
    </div>
}
export default TransactionInfoCard
