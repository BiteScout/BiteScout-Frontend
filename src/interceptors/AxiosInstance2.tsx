import axios from 'axios';

const useAxios2 = () => {
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: 'http://34.123.245.191:8222',
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