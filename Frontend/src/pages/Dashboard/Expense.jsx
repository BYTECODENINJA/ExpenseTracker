import React, {useEffect, useState} from 'react'
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import ExpenseOverview from "../../components/Expense/ExpenseOverview.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import Modal from "../../components/layouts/Modal.jsx";
import AddExpenseForm from "../../components/Expense/AddExpenseForm.jsx";
import toast from "react-hot-toast";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard.jsx";
import moment from "moment";
import { LuDownload } from "react-icons/lu";

const Expense = () => {

    const [expenseData, setExpenseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

    //Get All expense details
    const fetchExpenseDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`
            );

            if (response.data){
                setExpenseData(response.data);
            }
        }catch(err){
            console.log('Something went wrong please try again.', err);
        } finally {
            setLoading(false);
        }
    };

    //Handle Add Expense
    const handleAddExpense = async (expense) => {
        const {category, amount, date, icon} = expense;

        //validation Check
        if (!category.trim()) {
            toast.error("Category is required")
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount is required and it should be a number more than 0")
            return;
        }

        if (!date) {
            toast.error("Date is required");
            return;
        }

        try {
            const response = await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category, amount, date, icon
            });

            if (response.data) {
                toast.success("Expense added successfully!");
                setOpenAddExpenseModal(false);
                fetchExpenseDetails(); // Refresh the list
            }
        } catch (err) {
            toast.error("Failed to add expense. Please try again.");
            console.error(err);
        }
    }

    //Delete Expense
    const deleteExpense = async (expenseId) => {
        try {
            const response = await axiosInstance.delete(
                API_PATHS.EXPENSE.DELETE_EXPENSE(expenseId)
            );

            if (response.data) {
                toast.success("Expense deleted successfully!");
                fetchExpenseDetails(); // Refresh the list
            }
        } catch (err) {
            toast.error("Failed to delete expense. Please try again.");
            console.error(err);
        }
    }

    //Handle Download Expense Details
    const handleDownloadExpenseDetails = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
                { responseType: 'blob' }
            );

            // Create a blob from the response
            const blob = new Blob([response.data], {
                type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            });

            // Create a link and trigger download
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'expense_details.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("Expense details downloaded successfully!");
        } catch (err) {
            toast.error("Failed to download expense details. Please try again.");
            console.error(err);
        }
    }

    const handleDeleteClick = (expense) => {
        setOpenDeleteAlert({
            show: true,
            data: expense,
        });
    };

    const confirmDelete = async () => {
        if (openDeleteAlert.data) {
            await deleteExpense(openDeleteAlert.data._id);
            setOpenDeleteAlert({
                show: false,
                data: null,
            });
        }
    };

    useEffect(() => {
        fetchExpenseDetails();

        return () => {}
    }, [])

    return (
        <DashboardLayout activeMenu="Expense">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <ExpenseOverview
                            transactions={expenseData}
                            onAddExpense={() => setOpenAddExpenseModal(true)}
                        />
                    </div>

                    {/* Expense List */}
                    <div className='card'>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h5 className='text-lg'>All Expense Transactions</h5>
                                <p className='mt-0.5 text-sm text-gray-500'>Manage your expense records</p>
                            </div>
                            <button 
                                className='add-btn flex items-center gap-2'
                                onClick={handleDownloadExpenseDetails}
                            >
                                <LuDownload className='text-lg' /> Download Excel
                            </button>
                        </div>

                        <div className='mt-6'>
                            {loading ? (
                                <p className='text-center text-gray-500'>Loading...</p>
                            ) : expenseData && expenseData.length > 0 ? (
                                expenseData.map((expense) => (
                                    <TransactionInfoCard
                                        key={expense._id}
                                        title={expense.category}
                                        icon={expense.icon}
                                        date={moment(expense.date).format("Do MMM YYYY")}
                                        amount={expense.amount}
                                        type='expense'
                                        onDelete={() => handleDeleteClick(expense)}
                                    />
                                ))
                            ) : (
                                <p className='text-center text-gray-500 py-8'>No expense records found. Add your first expense!</p>
                            )}
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title='Add Expense'>
                    <AddExpenseForm onAddExpense={handleAddExpense}/>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title='Delete Expense'>
                    <div>
                        <p className='mb-4'>Are you sure you want to delete this expense record?</p>
                        {openDeleteAlert.data && (
                            <div className='mb-4 p-3 bg-gray-100 rounded'>
                                <p><strong>Category:</strong> {openDeleteAlert.data.category}</p>
                                <p><strong>Amount:</strong> Ksh{openDeleteAlert.data.amount}</p>
                                <p><strong>Date:</strong> {moment(openDeleteAlert.data.date).format("Do MMM YYYY")}</p>
                            </div>
                        )}
                        <div className='flex justify-end gap-3'>
                            <button
                                className='px-4 py-2 bg-gray-200 rounded hover:bg-gray-300'
                                onClick={() => setOpenDeleteAlert({ show: false, data: null })}
                            >
                                Cancel
                            </button>
                            <button
                                className='px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600'
                                onClick={confirmDelete}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </DashboardLayout>
    )
}
export default Expense
