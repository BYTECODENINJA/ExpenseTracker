import React, {useState} from 'react'
import {FaRegEye, FaRegEyeSlash} from "react-icons/fa6";

const Input = ({value, onChange, placeholder, label, type}) => {

       const [showPassword, setShowPassword] = useState(false);

       const toggleShowPassword = () => {
           setShowPassword(!showPassword);
       };
       return (
        <div>
            <label className="text-[13px] text-slate-500">{label}</label>

            <div className="input-box">
                <input
                    type={type === "password" ? showPassword ? "text" : "password" : type}
                    placeholder={placeholder}
                    className="w-full px-3 py-2 rounded-md border border-slate-300 focus:outline-none focus:border-primary"
                    value={value}
                    onChange={(e)=> onChange(e)}
                />

                {type === "password" && (
                    <>
                        {showPassword ? (
                            <FaRegEye
                                fontSize={22}
                                className="text-primary cursor-pointer"
                                onClick={() => toggleShowPassword()} />
                                ) : (
                                 <FaRegEyeSlash
                                 fontSize={22}
                                 className="text-blue-500 cursor-pointer"
                                 onclick={() => toggleShowPassword()} />
                            )}
                        </>
                    )}
            </div>
        </div>
       )
}
export default Input
