import React, { useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  Button,
  Div,
  InfoRow,
} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { getUserInfo, type UserInfo } from '../api';

interface HomeProps {
  id: string;
}

const Home: React.FC<HomeProps> = ({ id }) => {
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const data = await getUserInfo();
        setUserData(data);
      } catch (err) {
        setError('Ошибка при загрузке данных');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchUserInfo();
  }, []);

  const shareOnWall = () => {
    bridge.send('VKWebAppShowWallPostBox', {
      message: 'Привет из АНТИ-ТАР! Мой уровень: ' + (userData?.level || 1),
    });
  };

  return (
    <Panel id={id}>
      <PanelHeader>АНТИ-ТАР</PanelHeader>

      <Group header={<Header>Состояние</Header>}>
        <Div>
          {loading ? (
            'Загрузка...'
          ) : error ? (
            error
          ) : (
            <>
              <SimpleCell>
                <InfoRow header="Текущий баланс">
                  {userData?.balance} монет
                </InfoRow>
              </SimpleCell>
              <SimpleCell>
                <InfoRow header="Статус бота">
                  {userData?.status}
                </InfoRow>
              </SimpleCell>
            </>
          )}
        </Div>
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
