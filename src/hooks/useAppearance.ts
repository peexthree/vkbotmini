import { useEffect, useState } from 'react';
import bridge, { type AppearanceType } from '@vkontakte/vk-bridge';

export const useAppearance = () => {
  const [appearance, setAppearance] = useState<AppearanceType>('dark');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (event: any) => {
      if (event.detail.type === 'VKWebAppUpdateConfig') {
        const receivedAppearance = event.detail.data.appearance;
        // Force dark mode if appearance is empty or not light/dark
        if (receivedAppearance === 'light') {
          setAppearance('light');
        } else {
          setAppearance('dark');
        }
      }
    };
    bridge.subscribe(handler);
    return () => bridge.unsubscribe(handler);
  }, []);

  return appearance;
};
