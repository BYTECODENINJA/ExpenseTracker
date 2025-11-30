import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";

const Home = () => {
    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
                setDashboardData(response.data);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                setError("Failed to load dashboard data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return (
            <DashboardLayout activeMenu="Dashboard">
                <div className="my-5 mx-auto">Loading...</div>
            </DashboardLayout>
        );
    }

    if (error) {
        return (
            <DashboardLayout activeMenu="Dashboard">
                <div className="my-5 mx-auto text-red-500">{error}</div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Balance</h3>
                        <p className="text-3xl font-bold text-gray-900">${dashboardData?.balance.toFixed(2) || '0.00'}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Recent Transactions</h3>
                        {dashboardData?.recentTransactions.length > 0 ? (
                            <ul>
                                {dashboardData.recentTransactions.map((transaction) => (
                                    <li key={transaction._id} className="flex justify-between items-center py-2 border-b">
                                        <p className="text-gray-800">{transaction.description}</p>
                                        <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}`}>
                                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                        </p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-600">No recent transactions to display.</p>
                        )}
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Quick Actions</h3>
                        <div className="flex space-x-4">
                            <a href="/income" className="bg-primary text-white px-4 py-2 rounded-md">Add Income</a>
                            <a href="/expense" className="bg-red-500 text-white px-4 py-2 rounded-md">Add Expense</a>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Home;
