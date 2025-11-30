import React, { useState, useContext } from 'react';
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from '../../context/userContext.jsx';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter a valid password");
            return;
        }

        setError("");

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password });
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong, please try again.");
            }
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">Please enter your details to log in</p>
                <form onSubmit={handleLogin}>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email address"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Enter Password: Min 8 characters"
                        type="password"
                    />
                    {error && <p className="text-red-500 pb-2.5">{error}</p>}
                    <button type="submit" className="w-full mt-6 py-2 rounded-md bg-primary text-white">Login</button>
                    <p className="text-sm text-slate-500 mt-[10px]">Don't have an account? <a href="/signup" className="text-primary">Sign Up</a></p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default Login;