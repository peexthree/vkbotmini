import React, { useState } from 'react';
import {
  AppRoot,
  SplitLayout,
  SplitCol,
  View,
  Epic,
  Tabbar,
  TabbarItem,
  ConfigProvider,
  AdaptivityProvider,
} from '@vkontakte/vkui';
import {
  Icon28NewsfeedOutline,
  Icon28ServicesOutline,
  Icon28UserCircleOutline,
} from '@vkontakte/icons';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Services from './pages/Services';
import { useAppearance } from './hooks/useAppearance';
import { useBridge } from './hooks/useBridge';

const App: React.FC = () => {
  const appearance = useAppearance();
  useBridge();
  const [activeStory, setActiveStory] = useState<string>('home');

  const onStoryChange = (e: React.MouseEvent<HTMLElement>) => {
    const story = e.currentTarget.dataset.story;
    if (story) {
      setActiveStory(story);
    }
  };

  return (
    <ConfigProvider colorScheme={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout>
            <SplitCol>
              <Epic
                activeStory={activeStory}
                tabbar={
                  <Tabbar>
                    <TabbarItem
                      onClick={onStoryChange}
                      selected={activeStory === 'home'}
                      data-story="home"
                    >
                      <Icon28NewsfeedOutline />
                      <div style={{ fontSize: 10 }}>Главная</div>
                    </TabbarItem>
                    <TabbarItem
                      onClick={onStoryChange}
                      selected={activeStory === 'services'}
                      data-story="services"
                    >
                      <Icon28ServicesOutline />
                      <div style={{ fontSize: 10 }}>Сервисы</div>
                    </TabbarItem>
                    <TabbarItem
                      onClick={onStoryChange}
                      selected={activeStory === 'profile'}
                      data-story="profile"
                    >
                      <Icon28UserCircleOutline />
                      <div style={{ fontSize: 10 }}>Профиль</div>
                    </TabbarItem>
                  </Tabbar>
                }
              >
                <View id="home" activePanel="home">
                  <Home id="home" />
                </View>
                <View id="services" activePanel="services">
                  <Services id="services" />
                </View>
                <View id="profile" activePanel="profile">
                  <Profile id="profile" />
                </View>
              </Epic>
            </SplitCol>
          </SplitLayout>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
};

export default App;
