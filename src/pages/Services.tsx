import React from 'react';
import { Panel, PanelHeader, Group, Placeholder } from '@vkontakte/vkui';
import { Icon28ServicesOutline } from '@vkontakte/icons';

interface ServicesProps {
  id: string;
}

const Services: React.FC<ServicesProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Сервисы</PanelHeader>
      <Group>
        <Placeholder
          icon={<Icon28ServicesOutline width={56} height={56} />}
        >
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Доступные услуги</div>
          Список сервисов будет доступен позже.
        </Placeholder>
      </Group>
    </Panel>
  );
};

export default Services;
