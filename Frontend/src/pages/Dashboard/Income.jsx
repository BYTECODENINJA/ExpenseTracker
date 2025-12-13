import React, {useEffect, useState} from 'react'
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import IncomeOverview from "../../components/Income/IncomeOverview.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import Modal from "../../components/layouts/Modal.jsx";
import AddIncomeForm from "../../components/Income/AddIncomeForm.jsx";
import toast from "react-hot-toast";
import TransactionInfoCard from "../../components/Cards/TransactionInfoCard.jsx";
import moment from "moment";
import { LuDownload } from "react-icons/lu";

const Income = () => {

    const [incomeData, setIncomeData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

    //Get All income details
    const fetchIncomeDetails = async () => {
        if (loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.INCOME.GET_ALL_INCOME}`
            );

            if (response.data){
                setIncomeData(response.data);
            }
        }catch(err){
            console.log('Something went wrong please try again.', err);
        } finally {
            setLoading(false);
        }
    };

    //Handle Add Income
    const handleAddIncome = async (income) => {
        const {source, amount, date, icon} = income;

        //validation Check
        if (!source.trim()) {
            toast.error("Source is required")
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
            const response = await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                source, amount, date, icon
            });

            if (response.data) {
                toast.success("Income added successfully!");
                setOpenAddIncomeModal(false);
                fetchIncomeDetails(); // Refresh the list
            }
        } catch (err) {
            toast.error("Failed to add income. Please try again.");
            console.error(err);
        }
    }

    //Delete Income
    const deleteIncome = async (incomeId) => {
        try {
            const response = await axiosInstance.delete(
                API_PATHS.INCOME.DELETE_INCOME(incomeId)
            );

            if (response.data) {
                toast.success("Income deleted successfully!");
                fetchIncomeDetails(); // Refresh the list
            }
        } catch (err) {
            toast.error("Failed to delete income. Please try again.");
            console.error(err);
        }
    }

    //Handle Download Income Details
    const handleDownloadIncomeDetails = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.INCOME.DOWNLOAD_INCOME,
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
            link.setAttribute('download', 'income_details.xlsx');
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            toast.success("Income details downloaded successfully!");
        } catch (err) {
            toast.error("Failed to download income details. Please try again.");
            console.error(err);
        }
    }

    useEffect(() => {
        fetchIncomeDetails();

        return () => {}
    }, [])

    const handleDeleteClick = (income) => {
        setOpenDeleteAlert({
            show: true,
            data: income,
        });
    };

    const confirmDelete = async () => {
        if (openDeleteAlert.data) {
            await deleteIncome(openDeleteAlert.data._id);
            setOpenDeleteAlert({
                show: false,
                data: null,
            });
        }
    };

    return (
        <DashboardLayout activeMenu="Income">
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>

                    {/* Income List */}
                    <div className='card'>
                        <div className='flex items-center justify-between mb-6'>
                            <div>
                                <h5 className='text-lg'>All Income Transactions</h5>
                                <p className='mt-0.5 text-sm text-gray-500'>Manage your income records</p>
                            </div>
                            <button 
                                className='add-btn flex items-center gap-2'
                                onClick={handleDownloadIncomeDetails}
                            >
                                <LuDownload className='text-lg' /> Download Excel
                            </button>
                        </div>

                        <div className='mt-6'>
                            {loading ? (
                                <p className='text-center text-gray-500'>Loading...</p>
                            ) : incomeData && incomeData.length > 0 ? (
                                incomeData.map((income) => (
                                    <TransactionInfoCard
                                        key={income._id}
                                        title={income.source}
                                        icon={income.icon}
                                        date={moment(income.date).format("Do MMM YYYY")}
                                        amount={income.amount}
                                        type='income'
                                        onDelete={() => handleDeleteClick(income)}
                                    />
                                ))
                            ) : (
                                <p className='text-center text-gray-500 py-8'>No income records found. Add your first income!</p>
                            )}
                        </div>
                    </div>
                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title='Add Income'>
                    <AddIncomeForm onAddIncome={handleAddIncome}/>
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={openDeleteAlert.show}
                    onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                    title='Delete Income'>
                    <div>
                        <p className='mb-4'>Are you sure you want to delete this income record?</p>
                        {openDeleteAlert.data && (
                            <div className='mb-4 p-3 bg-gray-100 rounded'>
                                <p><strong>Source:</strong> {openDeleteAlert.data.source}</p>
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
export default Income