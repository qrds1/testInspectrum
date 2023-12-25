import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000/api'

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 403) {
            console.error('Invalid or expired token. Logging out...');
            alert('Invalid or expired token. Logging out...');
            localStorage.removeItem('token');
            window.location.href = '/'
        }
        return Promise.reject(error);
    }
);


export default axios;