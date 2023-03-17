import axios from 'axios';

const axiosClient = axios.create({
  baseURL: `http://localhost:${import.meta.env.VITE_APP_PORT}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosClient;
