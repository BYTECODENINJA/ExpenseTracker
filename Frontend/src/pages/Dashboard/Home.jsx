import React, { useState, useEffect, useCallback } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { useNavigate, useLocation } from "react-router-dom";
import InfoCard from "../../components/Cards/InfoCard.jsx";

import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { useUserAuth } from "../../hooks/useUserAuth.jsx";
import { addThousandsSeparator } from "../../utils/helper.js";
import RecentTransactions from "../../components/Dashboard/RecentTransactions.jsx";
import FinanceOverview from "../../components/Dashboard/FinanceOverview.jsx";
import expense from "./Expense.jsx";
import ExpenseTransactions from "../../components/Dashboard/ExpenseTransactions.jsx";
import Last30DaysExpenses from "../../components/Dashboard/last30DaysExpenses.jsx";
import RecentIncomeWithChart from "./RecentIncomeWithChart.jsx";
import RecentIncome from "../../components/Dashboard/RecentIncome.jsx";

const Home = () => {
    const { user, loading: authLoading } = useUserAuth()

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const fetchDashboardData = useCallback(async () => {
        setLoading(true)

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.DASHBOARD.GET_DATA}`
            );

            if (response.data) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.log("Something went wrong please try again", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // Only fetch when user is authenticated and not loading
        if (user && !authLoading) {
            fetchDashboardData();
        }
        return () => { };
    }, [user, authLoading, location.pathname, fetchDashboardData])

    return (
        <DashboardLayout activeMenu="Dashboard">
             <div className="my-5 mx-auto">
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    <InfoCard
                        icon={<IoMdCard />}
                        label="Total Balance"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="bg-primary"
                    />

                    <InfoCard
                        icon={<LuWalletMinimal />}
                        label="Total Income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="bg-orange-500"
                    />

                    <InfoCard
                        icon={<LuHandCoins />}
                        label="Total Expense"
                        value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                        color="bg-red-500"
                    />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 '>
                    <RecentTransactions
                    transactions={dashboardData?.recentTransactions}
                    onSeeMore ={()=>navigate("/expense")}
                    />

                    <FinanceOverview
                        totalBalance={dashboardData?.totalBalance || 0}
                        totalIncome={dashboardData?.totalIncome || 0}
                        totalExpense={dashboardData?.totalExpense || 0}
                        />

                    <ExpenseTransactions
                        transactions = {dashboardData?.last30DaysExpenses?.transactions || []}
                        onSeeMore ={()=>navigate("/expense")}
                        />

                    <Last30DaysExpenses
                        data={dashboardData?.last30DaysExpenses?.transactions || []}
                    />

                   <RecentIncomeWithChart
                       data={dashboardData?.last60DaysIncome?.transactions?.slice(0,4) || []}
                       totalIncome={dashboardData?.last60DaysIncome?.total || 0}
                       />

                    <RecentIncome
                        transactions={dashboardData?.last60DaysIncome?.transactions || []}
                        onSeeMore ={()=>navigate("/income")}
                        />

                </div>
            </div>
        </DashboardLayout>
    );
}

export default Home;
