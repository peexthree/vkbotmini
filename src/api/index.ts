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
  grimoire_count: number;
  syndicate_count: number;
  cycle_days: number;
  active_skin: string;
}

export interface GrimoireItem {
  id: number;
  title: string;
  date: string;
  preview: string;
  full_text: string;
  image_url: string;
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

export const getGrimoire = async (): Promise<GrimoireItem[]> => {
  const response = await instance.get<GrimoireItem[]>('/api/profile/grimoire');
  return response.data;
};

export default instance;
