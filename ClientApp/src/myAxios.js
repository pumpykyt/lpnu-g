import axios from 'axios';

const token = localStorage.getItem('token');
const instance = axios.create({
    baseUrl: 'https://localhost:5001/',
    headers: {
        Authorization: `Bearer ${token}`
    }
});

export default instance;