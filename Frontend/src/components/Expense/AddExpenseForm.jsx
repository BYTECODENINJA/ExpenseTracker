import React, {useState} from 'react'
import Input from "../Inputs/Input.jsx";
import EmojiPickerPopup from "../layouts/EmojiPickerPopup.jsx";

const AddExpenseForm = ({onAddExpense}) => {
    const [expense, setExpense] = useState({
            category: '',
            amount: '',
            date: '',
            icon: '',
        }
    )
    const handleChange = (key, value) => setExpense({...expense, [key]: value})
    return (
        <div>

            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            <Input
                type="text"
                value={expense.category}
                onChange={({target}) => handleChange("category", target.value)}
                label='Expense Category'
                placeholder='Food, Transport, etc'
            />

            <Input
                type="number"
                value={expense.amount}
                onChange={({target}) => handleChange("amount", target.value)}
                label='Amount'
                placeholder='Enter the Amount'
            />

            <Input
                value={expense.date}
                onChange={({target}) => handleChange("date", target.value)}
                label='Date'
                placeholder='Enter the date'
                type='date'
            />

            <div className='flex justify-end mt-6'>
                <button
                    type={'button'}
                    className='add-btn'
                    onClick={()=> onAddExpense(expense)}>
                    Add Expense
                </button>
            </div>


        </div>
    )
}
export default AddExpenseForm

