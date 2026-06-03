import React from 'react';
import { Panel, PanelHeader, Group, Placeholder } from '@vkontakte/vkui';
import { Icon28UserOutline } from '@vkontakte/icons';

interface ProfileProps {
  id: string;
}

const Profile: React.FC<ProfileProps> = ({ id }) => {
  return (
    <Panel id={id}>
      <PanelHeader>Профиль</PanelHeader>
      <Group>
        <Placeholder
          icon={<Icon28UserOutline width={56} height={56} />}
        >
          <div style={{ fontWeight: 'bold', fontSize: 16 }}>Личный кабинет</div>
          Здесь будет информация о пользователе.
        </Placeholder>
      </Group>
    </Panel>
  );
};

export default Profile;
