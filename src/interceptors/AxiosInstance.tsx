import axios from 'axios';

const useAxios = () => {
    const token = localStorage.getItem("token");

    const axiosInstance = axios.create({
        baseURL: 'https://bitescout.space',
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