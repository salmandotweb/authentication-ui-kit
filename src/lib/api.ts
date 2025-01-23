import axios from 'axios';
import { getCookie } from 'cookies-next';

const api = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_URL,
});

api.interceptors.request.use((config) => {
   const token = getCookie('authToken');
   if (token) {
      config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
}, (error) => {
   return Promise.reject(error);
});

api.interceptors.response.use(
   (response) => response,
   async (error) => {
      if (error.response?.status === 401) {
         return Promise.reject(error);
      }
      return Promise.reject(error);
   }
);

export default api;
