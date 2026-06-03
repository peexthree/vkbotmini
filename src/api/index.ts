import axios from 'axios';
import { BACKEND_URL } from '../config';

export interface UserStats {
  clicks: number;
}

export interface UserInfo {
  balance: number;
  level: number;
  stats: UserStats;
  status: string;
}

const instance = axios.create({
  baseURL: BACKEND_URL,
});

instance.interceptors.request.use((config) => {
  const search = window.location.search;
  if (search) {
    // Remove leading '?' if present
    const queryString = search.startsWith('?') ? search.substring(1) : search;
    config.headers['X-VK-Params'] = queryString;
  }
  return config;
});

export const getUserInfo = async (): Promise<UserInfo> => {
  const response = await instance.get<UserInfo>('/api/user/info');
  return response.data;
};

export default instance;
