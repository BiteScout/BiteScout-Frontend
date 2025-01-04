import axios from 'axios';

const useAxios = () => {
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: 'http://104.154.34.122:8222/v1/',
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