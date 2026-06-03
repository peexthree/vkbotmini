import { useEffect, useState } from 'react';
import bridge from '@vkontakte/vk-bridge';

export const useBridge = () => {
  const [userId] = useState<number | null>(() => {
    const search = window.location.search;
    if (search) {
      const params = new URLSearchParams(search);
      const vkUserId = params.get('vk_user_id');
      return vkUserId ? parseInt(vkUserId, 10) : null;
    }
    return null;
  });

  useEffect(() => {
    bridge.send('VKWebAppInit');
  }, []);

  return { userId };
};
