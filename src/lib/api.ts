import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://localhost:3333',
});

// 'https://coffee-delivery-api-1.onrender.com'
// 'http://localhost:3333'
