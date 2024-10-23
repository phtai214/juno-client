import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true, // Tự động gửi và nhận cookie
    baseURL: 'http://localhost:3001/api/v1',
});

export default axiosInstance;