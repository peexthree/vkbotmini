import React from 'react';
import { Panel, PanelHeader, Group, CardGrid, ContentCard, Header } from '@vkontakte/vkui';
import {
  Icon28FavoriteOutline,
  Icon28WorkOutline,
  Icon28BookOutline
} from '@vkontakte/icons';

interface ServicesProps {
  id: string;
}

const Services: React.FC<ServicesProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Сервисы</PanelHeader>
      <Group header={<Header>Предсказания</Header>}>
        <CardGrid size="l">
          <ContentCard
            overTitle="Магия чувств"
            title="Любовь"
            description="Узнайте, что звезды готовят для вашего сердца сегодня."
            caption="Нажми, чтобы открыть"
            maxHeight={150}
          >
            <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
              <Icon28FavoriteOutline width={48} height={48} style={{ color: 'var(--vkui--color_icon_negative)' }} />
            </div>
          </ContentCard>

          <ContentCard
            overTitle="Путь к успеху"
            title="Карьера"
            description="Какие профессиональные вершины покорятся вам в ближайшее время?"
            caption="Нажми, чтобы открыть"
            maxHeight={150}
          >
            <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
              <Icon28WorkOutline width={48} height={48} style={{ color: 'var(--vkui--color_icon_accent)' }} />
            </div>
          </ContentCard>

          <ContentCard
            overTitle="Источник знаний"
            title="Мудрость"
            description="Получите совет от древних мудрецов для решения ваших проблем."
            caption="Нажми, чтобы открыть"
            maxHeight={150}
          >
            <div style={{ padding: 16, display: 'flex', justifyContent: 'center' }}>
              <Icon28BookOutline width={48} height={48} style={{ color: 'var(--vkui--color_icon_tertiary)' }} />
            </div>
          </ContentCard>
        </CardGrid>
      </Group>
    </Panel>
  );
};

export default Services;
