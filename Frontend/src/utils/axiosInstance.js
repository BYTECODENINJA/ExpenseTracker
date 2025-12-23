import axios from 'axios';
import { BASE_URL } from "./apiPaths.js";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

//Request Interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('token');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    });

//response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle common errors globally, guard against missing response (e.g., network errors)
        const status = error?.response?.status;
        if (status === 401) {
            // redirect to login page (ensure path case matches routes)
            const baseUrl = import.meta.env.BASE_URL.endsWith('/')
                ? import.meta.env.BASE_URL
                : `${import.meta.env.BASE_URL}/`;
            window.location.href = `${baseUrl}login`;
        } else if (status === 500) {
            console.error("Server error. Please try again");
        } else if (!status) {
            // Network error or timeout
            console.warn("Network error. Please check your connection or backend server.");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;