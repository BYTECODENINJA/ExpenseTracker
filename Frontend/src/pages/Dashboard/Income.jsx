import React, {useEffect, useState} from 'react'
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import IncomeOverview from "../../components/Income/IncomeOverview.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import {API_PATHS} from "../../utils/apiPaths.js";
import Modal from "../../components/layouts/Modal.jsx";
import AddIncomeForm from "../../components/Income/AddIncomeForm.jsx";
import toast from "react-hot-toast";

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
    const deleteIncome = async () => {}

    //Handle Download Income Details
    const handleDownloadIncomeDetails = async () =>{}

    useEffect(() => {
        fetchIncomeDetails();

        return () => {}
    }, [])

    return (
        <DashboardLayout>
            <div className='my-5 mx-auto'>
                <div className='grid grid-cols-1 gap-6'>
                    <div className=''>
                        <IncomeOverview
                            transactions={incomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>
                </div>

                <Modal
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title='Add Income'>
                    <AddIncomeForm onAddIncome={handleAddIncome}/>
                </Modal>
            </div>
        </DashboardLayout>
    )
}
export default Income