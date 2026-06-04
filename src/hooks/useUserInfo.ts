import { useState, useEffect } from 'react';
import { getUserInfo, type UserInfo } from '../api';

export const useUserInfo = () => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getUserInfo();
      setUserData(data);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch user data', err);
      setError('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refresh();
  }, []);

  return { userData, loading, error, refresh };
};
