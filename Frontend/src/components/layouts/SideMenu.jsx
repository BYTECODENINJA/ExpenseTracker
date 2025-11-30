import React, { useContext } from 'react';
import { SIDE_MENU_DATA } from "../../utils/data.js";
import { UserContext } from "../../context/userContext.jsx";
import { useNavigate } from "react-router-dom";

const SideMenu = ({ activeMenu, user }) => {
    const { clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "logout") {
            handleLogout();
            return;
        }
        navigate(route);
    };

    const handleLogout = () => {
        localStorage.clear();
        clearUser();
        navigate("/login");
    };

    return (
        <div className='w-64 bg-[#111827] p-5 backdrop-blur-[2px] fixed top-[61px] left-0 z-40 h-screen overflow-y-auto'>
            <div className="flex flex-col items-center text-center py-5">
                <img
                    src={user?.profileImageUrl || "/profile-placeholder.png"}
                    alt="profile-pic"
                    className="rounded-full w-24 h-24 object-cover mb-3 shadow-lg"/>
                <h5 className="text-white text-lg font-semibold truncate">
                    {user?.fullName || "Welcome Back!"}
                </h5>
            </div>

            {SIDE_MENU_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    className={`w-full flex items-center gap-4 text-[15px] ${activeMenu === item.label ? "text-white bg-primary" : "text-gray-400"} py-3 px-4 rounded-lg mb-2 hover:bg-primary hover:text-white transition-colors`}
                    onClick={() => handleClick(item.path)}
                >
                    <item.icon className='text-xl' />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default SideMenu;
