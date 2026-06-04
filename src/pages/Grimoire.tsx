import React, { useEffect, useState } from 'react';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  CardGrid,
  Card,
  Div,
  Text,
  Title,
  Headline,
  Spacing,
  Spinner,
  Button,
} from '@vkontakte/vkui';
import { getGrimoire, type GrimoireItem } from '../api';
import ErrorBoundary from '../components/ErrorBoundary';

interface GrimoireProps {
  id: string;
  onBack: () => void;
}

const Grimoire: React.FC<GrimoireProps> = ({ id, onBack }) => {
  const [items, setItems] = useState<GrimoireItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const neonPink = '#ff0055';
  const neonPurple = '#8a2be2';

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getGrimoire();
      setItems(data);
    } catch (err) {
      console.error('Failed to fetch grimoire:', err);
      setError('Не удалось установить связь с архивами Пустоты');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const gothicBackground: React.CSSProperties = {
    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a0a1a 100%)',
    minHeight: '100vh',
    color: '#e0e0e0',
  };

  const cardStyle: React.CSSProperties = {
    background: 'rgba(20, 20, 20, 0.8)',
    borderRadius: '12px',
    padding: '16px',
    border: '1px solid rgba(255, 0, 85, 0.2)',
    boxShadow: `0 0 10px rgba(255, 0, 85, 0.1)`,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    cursor: 'pointer',
    marginBottom: '12px',
  };

  const renderContent = () => {
    if (loading) {
      return (
        <Div style={{ textAlign: 'center', marginTop: 40 }}>
          <Spinner size="l" style={{ color: neonPink }} />
          <Spacing size={16} />
          <Text style={{ color: '#fff', textShadow: `0 0 5px ${neonPurple}` }}>
            Открываем древние свитки...
          </Text>
        </Div>
      );
    }

    if (error) {
      return (
        <Div style={{ textAlign: 'center', marginTop: 40 }}>
          <Title level="2" style={{ color: neonPink, marginBottom: 8 }}>Системный сбой</Title>
          <Text style={{ color: '#fff', marginBottom: 16 }}>{error}</Text>
          <Button
            mode="outline"
            size="m"
            onClick={fetchData}
            style={{ color: '#fff', borderColor: neonPink }}
          >
            Повторить ритуал
          </Button>
        </Div>
      );
    }

    if (items.length === 0) {
      return (
        <Div style={{ textAlign: 'center', marginTop: 40 }}>
          <Text style={{ color: '#888' }}>Гримуар пока пуст. Совершите свой первый расклад.</Text>
        </Div>
      );
    }

    return (
      <Group>
        <CardGrid size="l">
          {items.map((item) => (
            <Card key={item.id} style={{ background: 'transparent' }}>
              <div
                style={cardStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 15px ${neonPink}`;
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 10px rgba(255, 0, 85, 0.1)`;
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Headline weight="2" style={{ color: neonPink, textShadow: `0 0 5px ${neonPink}`, fontSize: '18px' }}>
                  {item.title}
                </Headline>
                <Text style={{ color: '#666', fontSize: '12px', marginBottom: '8px' }}>
                  {item.date}
                </Text>
                <Text style={{ color: '#ccc', lineHeight: '1.4' }}>
                  {item.preview}
                </Text>
              </div>
            </Card>
          ))}
        </CardGrid>
      </Group>
    );
  };

  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={onBack} style={{ color: '#fff' }} />}
        style={{ background: '#000', borderBottom: `1px solid ${neonPink}33` }}
      >
        <span style={{ color: '#fff', textShadow: `0 0 5px ${neonPink}` }}>ГРИМУАР</span>
      </PanelHeader>

      <div style={gothicBackground}>
        <ErrorBoundary fallback={
          <Div style={{ color: '#fff', textAlign: 'center', marginTop: '40px' }}>
            <Title level="2" style={{ color: neonPink }}>Искажение реальности</Title>
            <Text style={{ color: '#fff' }}>Ваша судьба скрыта за завесой. Попробуйте позже.</Text>
          </Div>
        }>
          {renderContent()}
        </ErrorBoundary>
      </div>
    </Panel>
  );
};

export default Grimoire;
