import React, { useEffect, useState } from 'react';
import { Panel, PanelHeader, Group, SimpleCell, InfoRow, Header, Div } from '@vkontakte/vkui';
import { useBridge } from '../hooks/useBridge';
import { getUserInfo, type UserInfo } from '../api';

interface ProfileProps {
  id: string;
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const { userId } = useBridge();
  const [userData, setUserData] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserInfo();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>
      <Group header={<Header>Информация</Header>}>
        <SimpleCell>
          <InfoRow header="ID Пользователя">
            {userId || 'Не определен'}
          </InfoRow>
        </SimpleCell>
      </Group>

      <Group header={<Header>Статистика</Header>}>
        {loading ? (
          <Div>Загрузка...</Div>
        ) : (
          <>
            <SimpleCell>
              <InfoRow header="Уровень">
                {userData?.level}
              </InfoRow>
            </SimpleCell>
            <SimpleCell>
              <InfoRow header="Всего кликов">
                {userData?.stats.clicks}
              </InfoRow>
            </SimpleCell>
          </>
        )}
      </Group>
    </Panel>
  );
};

export default Profile;
