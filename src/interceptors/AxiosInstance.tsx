import axios from 'axios';

const useAxios = () => {
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: 'https://34.49.38.147',
    });

    // Attach the token to requests
    axiosInstance.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return axiosInstance;
};

export default useAxios;