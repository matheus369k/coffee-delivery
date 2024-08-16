import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://coffee-delivery-api-1.onrender.com',
});

// 'https://coffee-delivery-api-1.onrender.com'
// 'http://localhost:3333'
