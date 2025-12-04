import React from 'react'

const Modal = ({children, isOpen, onClose, title}) => {

    if(!isOpen) return null;

    return <div className='fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%-1rem)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
        <div className='relative p-4 w-full max-w-2xl max-h-full'>
            {/*Modal content*/}
            <div className='relative bg-[#3d619b] rounded-lg shadow-sm'>
                {/*Modal header*/}

                <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
                    <h3 className='text-lg font-medium text-gray-900'>
                        {title}
                    </h3>

                    <button
                    type='button'
                    className='text-primary bg-transparent hover:bg-black rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center'
                    onClick={onClose}>
                        X
                    </button>
                </div>
                {/*Modal Body*/}
                <div className='p-4 text-black md:p-5 space-y-4'>
                    {children}
                </div>
            </div>
        </div>
    </div>
}
export default Modal
