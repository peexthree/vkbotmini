import React, { useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  Group,
  SimpleCell,
  Header,
  Div,
  Avatar,
  Spacing,
  Title,
  Text,
  CardGrid,
  Card,
  Headline,
} from '@vkontakte/vkui';
import {
  Icon28BookOutline,
  Icon28Users3Outline,
  Icon28CompassOutline,
  Icon28UserOutline,
} from '@vkontakte/icons';
import bridge, { type UserInfo as VKUserInfo } from '@vkontakte/vk-bridge';
import { useUserInfo } from '../hooks/useUserInfo';
import ErrorBoundary from '../components/ErrorBoundary';

interface ProfileProps {
  id: string;
}

const DEFAULT_AVATAR = 'https://vk.com/images/camera_200.png';

const Profile: React.FC<ProfileProps> = ({ id }) => {
  const { userData, loading, refresh } = useUserInfo();
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

  const neonPink = '#ff0055';
  const neonPurple = '#8a2be2';

  const gothicBackground: React.CSSProperties = {
    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a1a 100%)',
    minHeight: '100vh',
    color: '#e0e0e0',
  };

  const headerCardStyle: React.CSSProperties = {
    background: 'rgba(20, 20, 20, 0.8)',
    borderRadius: '16px',
    padding: '24px',
    margin: '12px',
    border: '1px solid rgba(255, 0, 85, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: `0 0 20px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(138, 43, 226, 0.1)`,
  };

  const energyCounterStyle: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 'bold',
    color: neonPink,
    textShadow: `0 0 10px ${neonPink}, 0 0 20px ${neonPink}`,
    margin: '12px 0',
  };

  const rankBadgeStyle: React.CSSProperties = {
    background: `linear-gradient(90deg, ${neonPurple} 0%, #4b0082 100%)`,
    padding: '4px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    boxShadow: `0 0 8px ${neonPurple}`,
    marginBottom: '8px',
  };

  const menuCardStyle: React.CSSProperties = {
    background: 'rgba(30, 30, 30, 0.6)',
    border: '1px solid rgba(255, 255, 255, 0.05)',
    padding: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const renderContent = () => {
    if (loading && !userData) {
      return (
        <Div style={{ textAlign: 'center', marginTop: 40 }}>
          <Text style={{ color: '#fff', textShadow: `0 0 5px ${neonPurple}` }}>
            Призыв астральных данных...
          </Text>
        </Div>
      );
    }

    return (
      <div style={{ paddingBottom: '20px' }}>
        <div style={headerCardStyle}>
          <div style={{ position: 'relative' }}>
            <Avatar
              size={96}
              src={vkUser?.photo_200 || DEFAULT_AVATAR}
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = DEFAULT_AVATAR;
              }}
              style={{ border: `2px solid ${neonPink}`, boxShadow: `0 0 15px ${neonPink}` }}
            />
          </div>
          <Spacing size={16} />
          <Title level="2" weight="2" style={{ color: '#fff', marginBottom: 4 }}>
            {vkUser ? `${vkUser.first_name} ${vkUser.last_name}` : 'Искатель'}
          </Title>
          <div style={rankBadgeStyle}>{userData?.status || 'Странник Пустоты'}</div>
          <Text style={{ color: '#888', fontSize: '14px' }}>Уровень {userData?.level || 1}</Text>

          <div style={energyCounterStyle}>
            {userData?.balance?.toLocaleString() || 0} ✨
          </div>
        </div>

        <Group header={<Header multiline style={{ color: '#aaa' }}>ЛУННЫЙ ЦИКЛ</Header>}>
          <Div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', margin: '0 12px', borderRadius: '8px' }}>
            <Headline weight="2" style={{ letterSpacing: '4px', fontSize: '20px', marginBottom: '8px' }}>
              🌑 🌘 🌗 🌖 🌕 ✨ 🔥
            </Headline>
            <Text style={{ color: neonPurple, fontWeight: '500' }}>
              Цикл: ... ({userData?.cycle_days || 0} дн.)
            </Text>
          </Div>
        </Group>

        <Group header={<Header multiline style={{ color: '#aaa' }}>МЕНЮ ПОДРАЗДЕЛОВ</Header>}>
          <CardGrid size="m">
            <Card style={{ borderRadius: '12px', overflow: 'hidden' }} onClick={() => {}}>
              <div style={menuCardStyle}>
                <Icon28BookOutline fill={neonPink} />
                <Spacing size={8} />
                <Headline level="2" weight="2" style={{ fontSize: '14px' }}>ГРИМУАР</Headline>
                <Text style={{ color: neonPink, fontSize: '12px', fontWeight: 'bold' }}>
                  {userData?.grimoire_count || 0}
                </Text>
              </div>
            </Card>
            <Card style={{ borderRadius: '12px', overflow: 'hidden' }} onClick={() => {}}>
              <div style={menuCardStyle}>
                <Icon28Users3Outline fill={neonPurple} />
                <Spacing size={8} />
                <Headline level="2" weight="2" style={{ fontSize: '14px' }}>МОЙ КРУГ</Headline>
                <Text style={{ color: neonPurple, fontSize: '12px', fontWeight: 'bold' }}>
                  {userData?.syndicate_count || 0}
                </Text>
              </div>
            </Card>
            <Card style={{ borderRadius: '12px', overflow: 'hidden' }} onClick={() => {}}>
              <div style={menuCardStyle}>
                <Icon28CompassOutline fill="#00ffcc" />
                <Spacing size={8} />
                <Headline level="2" weight="2" style={{ fontSize: '14px' }}>ПУТЕВОДИТЕЛЬ</Headline>
              </div>
            </Card>
            <Card style={{ borderRadius: '12px', overflow: 'hidden' }} onClick={() => {}}>
              <div style={menuCardStyle}>
                <Icon28UserOutline fill="#ffd700" />
                <Spacing size={8} />
                <Headline level="2" weight="2" style={{ fontSize: '14px' }}>ПЕРСОНАЖИ</Headline>
              </div>
            </Card>
          </CardGrid>
        </Group>
      </div>
    );
  };

  return (
    <Panel id={id}>
      <PanelHeader
        className="gothic-header"
        style={{ background: '#000', borderBottom: `1px solid ${neonPink}33` }}
      >
        <span style={{ color: '#fff', textShadow: `0 0 5px ${neonPink}` }}>ПРОФИЛЬ</span>
      </PanelHeader>

      <div className="profile-content" style={gothicBackground}>
        <ErrorBoundary fallback={
          <Div style={{ color: '#fff', textAlign: 'center', marginTop: '40px' }}>
            <Title level="2" style={{ color: neonPink }}>Системный сбой</Title>
            <Text style={{ color: '#fff' }}>Астральные потоки нестабильны. Попробуйте позже.</Text>
            <Spacing size={20} />
            <SimpleCell onClick={() => refresh()} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
              <span style={{ color: '#fff' }}>Переподключиться к источнику</span>
            </SimpleCell>
          </Div>
        }>
          {(() => {
            try {
              return renderContent();
            } catch (e) {
              console.error("Critical render error in Profile:", e);
              throw e; // Let ErrorBoundary handle it
            }
          })()}
        </ErrorBoundary>
      </div>

      <style>{`
        .gothic-header .vkuiPanelHeader__content {
           justify-content: center !important;
        }
        .vkuiCard--mode-shadow {
          box-shadow: 0 4px 12px rgba(0,0,0,0.5) !important;
        }
      `}</style>
    </Panel>
  );
};

export default Profile;
