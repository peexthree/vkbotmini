import bridge from '@vkontakte/vk-bridge';
import { createRoot } from 'react-dom/client';
import App from './App';
import '@vkontakte/vkui/dist/vkui.css';

bridge.send('VKWebAppInit');

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
