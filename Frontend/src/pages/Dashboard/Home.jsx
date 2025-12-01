import React, { useState, useEffect } from 'react';
import DashboardLayout from "../../components/layouts/DashboardLayout.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import {useNavigate} from "react-router-dom";
//import InfoCard from "../../components/InfoCard/InfoCard.jsx";

import {LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import {IoMdCard} from "react-icons/io";
import {useUserAuth} from "../../hooks/useUserAuth.jsx";
import {addThousandsSeparator} from "../../utils/helper.js";

const Home = () => {
    useUserAuth()

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


        const fetchDashboardData = async () => {
            if (loading) return;

            setLoading(true)

            try {
                const response = await axiosInstance.get(
                    `${API_PATHS.DASHBOARD.GET_DATA}`
                );

                if (response.data) {
                    setDashboardData(response.data);
                }
            }catch (error) {
                console.log("Something went wrong please try again", error);
            } finally {
                setLoading(false);
            }
        };

        useEffect(() => {
            fetchDashboardData();
            return () => {};
        }, [])

        return (
            <DashboardLayout activeMenu="Dashboard">
                <div className="my-5 mx-auto">
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                        <InfoCard
                            icon={<IoMdCard/>}
                            title="Total Income"
                            amount={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                            color = "bg-primary"
                            />
                    </div>
                </div>
            </DashboardLayout>
        );
    }

export default Home;
