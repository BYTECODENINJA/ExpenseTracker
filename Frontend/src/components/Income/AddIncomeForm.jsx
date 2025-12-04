import React, {useState} from 'react'
import Input from "../Inputs/Input.jsx";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup.jsx";

const AddIncomeForm = ({OnAddIncome}) => {
    const [income, setIncome] = useState({
        source: '',
        amount: '',
        date: '',
        icon: '',
        }
    )
   const handleChange = (key, value) => setIncome({...income, [key]: value})
    return (
        <div>

            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("Icon", selectedIcon)}
                />
            <Input
                type="text"
                value={income.source}
                onChange={({target}) => handleChange("source", target.value)}
                label='Income Source'
                placeholder='Freelance, salary, etc'
            />

            <Input
                type="number"
                value={income.amount}
                onChange={({target}) => handleChange("amount", target.value)}
                label='Amount'
                placeholder='Enter the Amount'
            />

            <Input
            value={income.date}
            onChange={({target}) => handleChange("date", target.value)}
            label='Date'
            placeholder='Enter the date'
            type='date'
            />

            <div className='flex justify-end mt-6'>
                <button
                type={'button'}
                className='add-btn'
                onClick={()=> onAddIncome(income)}>
                    Add Income
                </button>
            </div>


        </div>
    )
}
export default AddIncomeForm
