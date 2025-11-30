import React, { useState, useContext } from 'react';
import AuthLayout from "../../components/layouts/AuthLayout.jsx";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input.jsx";
import { validateEmail } from "../../utils/helper.js";
import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector.jsx";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import { UserContext } from '../../context/userContext.jsx';

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);

    const handleSignup = async (e) => {
        e.preventDefault();
        let profileImageUrl = "";

        if (!fullName) {
            setError("Please enter your full name");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!password) {
            setError("Please enter a valid password");
            return;
        }

        setError("");

        if (profilePic) {
            try {
                const formData = new FormData();
                formData.append("image", profilePic);
                const uploadResponse = await axiosInstance.post(API_PATHS.AUTH.UPLOAD_IMAGE, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                profileImageUrl = uploadResponse.data.imageUrl;
            } catch (uploadError) {
                console.error("Image upload failed:", uploadError);
                setError("Failed to upload profile image. Please try again or skip the image.");
                return;
            }
        }

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl,
            });
            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            console.error("Registration error:", error);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong during registration. Please try again.");
            }
        }
    };

    return (
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an account</h3>
                <p className="text-xs text-slate-700 mt-[5px] mb-6">Be a part of our community</p>
                <form onSubmit={handleSignup}>
                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <Input
                        value={fullName}
                        onChange={({ target }) => setFullName(target.value)}
                        label="Full Name"
                        placeholder="Enter your full name"
                        type="text"
                    />
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
                    <button type="submit" className="w-full mt-6 py-2 rounded-md bg-primary text-white">Sign Up</button>
                    <p className="text-sm text-slate-500 mt-[10px]">Already have an account? <a href="/login" className="text-primary">Login</a></p>
                </form>
            </div>
        </AuthLayout>
    );
};

export default SignUp;
