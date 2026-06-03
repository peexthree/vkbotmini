import { useEffect, useState } from 'react';
import bridge, { type AppearanceType } from '@vkontakte/vk-bridge';

export const useAppearance = () => {
  const [appearance, setAppearance] = useState<AppearanceType>('light');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (event: any) => {
      if (event.detail.type === 'VKWebAppUpdateConfig') {
        setAppearance(event.detail.data.appearance);
      }
    };
    bridge.subscribe(handler);
    return () => bridge.unsubscribe(handler);
  }, []);

  return appearance;
};
