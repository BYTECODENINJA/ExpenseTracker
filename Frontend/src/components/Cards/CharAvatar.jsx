import React from 'react'

const CharAvatar = ({fulName, width, height, style}) => {
    return  (
        <div className={`${width || 'w-12'} ${height || 'h-12'} ${style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium  bg-gray-100`}>
        {getInitials(fulName || "")}
    </div>
    )
}
export default CharAvatar
