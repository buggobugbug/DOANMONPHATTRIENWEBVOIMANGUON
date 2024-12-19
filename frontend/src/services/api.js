import axios from 'axios';

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    withCredentials: true,
});

// Hàm lấy CSRF token trước khi gửi request
export const getCsrfToken = async () => {
    await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        withCredentials: true,
    });
};

export default api;
