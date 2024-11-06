import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://hululug-server-dev.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
});
