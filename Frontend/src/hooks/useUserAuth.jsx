import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance.js";
import { API_PATHS } from "../utils/apiPaths.js";

export const useUserAuth = () => {
    const { user, updateUser, clearUser, loading, setLoading } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        let isMounted = true;

        const checkAuthStatus = async () => {
            if (!token) {
                if (isMounted) {
                    setLoading(false);
                }
                return;
            }

            if (!user) {
                try {
                    const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
                    if (isMounted) {
                        updateUser(response.data);
                    }
                } catch (error) {
                    console.error("Authentication failed:", error);
                    clearUser();
                    navigate("/login");
                } finally {
                    if (isMounted) {
                        setLoading(false);
                    }
                }
            } else {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        checkAuthStatus();

        return () => {
            isMounted = false;
        };
    }, []);

    return { user, loading };
};
