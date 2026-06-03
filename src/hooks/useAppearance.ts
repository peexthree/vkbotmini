import { useEffect, useState } from 'react';
import bridge, { type AppearanceType } from '@vkontakte/vk-bridge';

export const useAppearance = () => {
  const [appearance, setAppearance] = useState<AppearanceType>('light');

  useEffect(() => {
    const handler = ({ detail: { type, data } }: any) => {
      if (type === 'VKWebAppUpdateConfig') {
        setAppearance(data.appearance);
      }
    };
    bridge.subscribe(handler);
    return () => bridge.unsubscribe(handler);
  }, []);

  return appearance;
};
