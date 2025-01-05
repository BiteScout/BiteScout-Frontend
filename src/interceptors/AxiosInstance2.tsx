import axios from 'axios';

const useAxios2 = () => {
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: 'https://bitescout.space/api',
    });

    // Attach the token to requests
    axiosInstance.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer `;
        }
        return config;
    });

    return axiosInstance;
};

export default useAxios2;