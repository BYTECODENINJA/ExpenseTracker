import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const Input = ({ value, onChange, placeholder, label, type }) => {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex flex-col gap-y-1 mb-4">
            <label className="text-sm text-slate-500">{label}</label>
            <div className="relative">
                <input
                    type={type === "password" ? (showPassword ? "text" : "password") : type}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-primary pr-10"
                    value={value}
                    onChange={onChange}
                />
                {type === "password" && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? (
                            <FaRegEyeSlash fontSize={22} className="text-primary" />
                        ) : (
                            <FaRegEye fontSize={22} className="text-primary" />
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;
