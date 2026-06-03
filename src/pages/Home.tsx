import React, { useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  Button,
  Div,
} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { getStatus } from '../api';

interface HomeProps {
  id: string;
}

const Home: React.FC<HomeProps> = ({ id }) => {
  const [status, setStatus] = useState<string>('Загрузка...');

  useEffect(() => {
    async function fetchStatus() {
      try {
        const data = await getStatus();
        setStatus(data.status || 'OK');
      } catch (error) {
        setStatus('Ошибка подключения к бэкенду');
      }
    }
    fetchStatus();
  }, []);

  const shareOnWall = () => {
    bridge.send('VKWebAppShowWallPostBox', {
      message: 'Привет из АНТИ-ТАР!',
    });
  };

  return (
    <Panel id={id}>
      <PanelHeader>АНТИ-ТАР</PanelHeader>
      <Group header={<Header>Статус системы</Header>}>
        <SimpleCell>
          Бэкенд: {status}
        </SimpleCell>
      </Group>

      <Group header={<Header>Действия</Header>}>
        <Div>
          <Button size="l" stretched onClick={shareOnWall}>
            Поделиться на стене
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};

export default Home;
