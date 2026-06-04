import React, { useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  SimpleCell,
  InfoRow,
  Header,
  Div,
  Avatar,
  Spacing,
  Title,
  Text,
  Counter,
} from '@vkontakte/vkui';
import bridge, { type UserInfo as VKUserInfo } from '@vkontakte/vk-bridge';
import { useBridge } from '../hooks/useBridge';
import { useUserInfo } from '../hooks/useUserInfo';

interface ProfileProps {
  id: string;
}

const DEFAULT_AVATAR = 'https://vk.com/images/camera_200.png';

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const { userId } = useBridge();
  const { userData, loading } = useUserInfo();
  const [vkUser, setVkUser] = useState<VKUserInfo | null>(null);

  useEffect(() => {
    async function fetchVkInfo() {
      try {
        const user = await bridge.send('VKWebAppGetUserInfo');
        if (user && user.id) {
          setVkUser(user);
        }
      } catch (err) {
        console.error('Failed to fetch VK user info (VPN issue?)', err);
      }
    }
    fetchVkInfo();
  }, []);

  // Gothic/Cyberpunk fallback background
  const skinBackground: React.CSSProperties = {
    background: 'linear-gradient(135deg, #000000 0%, #1a0033 50%, #330000 100%)',
    minHeight: '200px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    padding: '20px',
    borderRadius: '12px',
    margin: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255,255,255,0.1)',
  };

  const renderContent = () => {
    // Show skeletal loader or something while loading to avoid perceived "black screen"
    if (loading && !userData) {
        return <Div style={{ textAlign: 'center', color: '#999', marginTop: 40 }}>Загрузка ритуалов...</Div>;
    }

    return (
      <div style={{ color: 'white' }}>
        <div style={skinBackground}>
          <Avatar
            size={96}
            src={vkUser?.photo_200 || DEFAULT_AVATAR}
            fallbackIcon={<div style={{ backgroundColor: '#222', width: '100%', height: '100%' }} />}
          />
          <Spacing size={12} />
          <Title level="2" weight="2" style={{ textAlign: 'center' }}>
            {vkUser ? `${vkUser.first_name} ${vkUser.last_name}` : 'Искатель'}
          </Title>
          <Text style={{ opacity: 0.8, color: '#ff00ff', textAlign: 'center' }}>
            {userData?.status || 'Странник Пустоты'}
          </Text>
        </div>

        <Group header={<Header multiline style={{ color: '#aaa' }}>Мистическая статистика</Header>}>
          <SimpleCell before={<Counter mode="primary">{userData?.level || 1}</Counter>}>
            <InfoRow header="Уровень просвещения">
              Путь {userData?.level || 1}
            </InfoRow>
          </SimpleCell>
          <SimpleCell>
            <InfoRow header="Всего кликов">
              {userData?.stats?.clicks?.toLocaleString() || 0}
            </InfoRow>
          </SimpleCell>
          <SimpleCell>
            <InfoRow header="ID в системе">
              {userId || 'Unknown'}
            </InfoRow>
          </SimpleCell>
        </Group>
      </div>
    );
  };

  return (
    <Panel id={id} style={{ backgroundColor: '#000', minHeight: '100vh' }}>
      <PanelHeader
        after={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingRight: '12px' }}>
            <Counter mode="primary">{userData?.balance || 0} 🪙</Counter>
          </div>
        }
      >
        Профиль
      </PanelHeader>

      {/* Local protection against crashes */}
      <div className="profile-content">
        {(() => {
          try {
            return renderContent();
          } catch (e) {
            console.error("Critical render error in Profile:", e);
            return (
              <Div style={{ color: 'white', textAlign: 'center' }}>
                <Title level="2">Системный сбой</Title>
                <Text>Астральные потоки нестабильны. Попробуйте позже.</Text>
              </Div>
            );
          }
        })()}
      </div>
    </Panel>
  );
};

export default Profile;
