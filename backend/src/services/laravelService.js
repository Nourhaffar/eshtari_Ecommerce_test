import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const laravelApi = axios.create({
    baseURL: 'https://api.sari3.com/v2/index.php?route=assignment_test',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

laravelApi.interceptors.response.use(
    response => response,
    error => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
    }
);

export const fetchFromLaravel = async () => {
    try {
        const response = await laravelApi.get('/home_widgets')
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default laravelApi;
