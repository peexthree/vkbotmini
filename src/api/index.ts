import axios from 'axios';
import { BACKEND_URL } from '../config';

const instance = axios.create({
  baseURL: BACKEND_URL,
});

instance.interceptors.request.use((config) => {
  const search = window.location.search;
  if (search) {
    const params = new URLSearchParams(search);
    params.forEach((value, key) => {
      config.params = {
        ...config.params,
        [key]: value,
      };
    });
  }
  return config;
});

export const getStatus = async () => {
  const response = await instance.get('/api/status');
  return response.data;
};

export default instance;
