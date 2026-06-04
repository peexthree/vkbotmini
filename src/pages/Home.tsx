import React from 'react';
import {
  Panel,
  PanelHeader,
  Header,
  Group,
  SimpleCell,
  Button,
  Div,
  InfoRow,
  Counter,
} from '@vkontakte/vkui';
import bridge from '@vkontakte/vk-bridge';
import { useUserInfo } from '../hooks/useUserInfo';

interface HomeProps {
  id: string;
}

const Home: React.FC<HomeProps> = ({ id }) => {
  const { userData, loading, error } = useUserInfo();

  const shareOnWall = () => {
    bridge.send('VKWebAppShowWallPostBox', {
      message: 'Привет из АНТИ-ТАР! Мой уровень: ' + (userData?.level || 1),
    });
  };

  return (
    <Panel id={id}>
      <PanelHeader
        after={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '12px' }}>
            <Counter mode="primary">{userData?.balance || 0} 🪙</Counter>
          </div>
        }
      >
        АНТИ-ТАР
      </PanelHeader>

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
              <SimpleCell>
                <InfoRow header="Уровень">
                  {userData?.level}
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
