import { useEffect, useState } from 'react';
import bridge, { type AppearanceType } from '@vkontakte/vk-bridge';

export const useAppearance = () => {
  const [appearance, setAppearance] = useState<AppearanceType>('dark');

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (event: any) => {
      if (event.detail.type === 'VKWebAppUpdateConfig') {
        const receivedAppearance = event.detail.data.appearance;
        if (receivedAppearance === 'light' || receivedAppearance === 'dark') {
          setAppearance(receivedAppearance);
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
