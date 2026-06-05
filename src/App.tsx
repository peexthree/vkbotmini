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
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  PanelHeaderButton,
  Div,
  Headline,
  Text,
} from '@vkontakte/vkui';
import {
  Icon28NewsfeedOutline,
  Icon28ServicesOutline,
  Icon28UserCircleOutline,
  Icon24Dismiss,
} from '@vkontakte/icons';
import type { GrimoireItem } from './api';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Services from './pages/Services';
import Grimoire from './pages/Grimoire';
import { useAppearance } from './hooks/useAppearance';
import { useBridge } from './hooks/useBridge';

const MODAL_PAGE_GRIMOIRE_DETAILS = 'grimoire-details';

const App: React.FC = () => {
  const appearance = useAppearance();
  useBridge();
  const [activeStory, setActiveStory] = useState<string>('home');
  const [activeProfilePanel, setActiveProfilePanel] = useState<string>('profile');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedReading, setSelectedReading] = useState<GrimoireItem | null>(null);

  const closeModal = () => setActiveModal(null);

  const onStoryChange = (story: string) => {
    setActiveStory(story);
  };

  const neonPink = '#ff0055';

  const modal = (
    <ModalRoot activeModal={activeModal} onClose={closeModal}>
      <ModalPage
        id={MODAL_PAGE_GRIMOIRE_DETAILS}
        onClose={closeModal}
        header={
          <ModalPageHeader
            after={
              <PanelHeaderButton onClick={closeModal}>
                <Icon24Dismiss />
              </PanelHeaderButton>
            }
          >
            <span style={{ color: neonPink, textShadow: `0 0 5px ${neonPink}` }}>ОТКРОВЕНИЕ</span>
          </ModalPageHeader>
        }
        settlingHeight={90}
      >
        {selectedReading && (
          <div style={{ background: '#0a0a0a', minHeight: '100%' }}>
            <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
              <img
                src={selectedReading.image_url}
                alt={selectedReading.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x600/0a0a0a/ff0055?text=TAROT';
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '100px',
                  background: 'linear-gradient(to top, #0a0a0a, transparent)',
                }}
              />
            </div>
            <Div>
              <Headline level="1" weight="2" style={{ color: neonPink, textShadow: `0 0 8px ${neonPink}`, marginBottom: 4 }}>
                {selectedReading.title}
              </Headline>
              <Text style={{ color: '#666', fontSize: '14px', marginBottom: 20 }}>
                {selectedReading.date}
              </Text>
              <Text
                style={{
                  color: '#b0a0b0',
                  lineHeight: '1.6',
                  fontSize: '17px',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {selectedReading.full_text}
              </Text>
              <div style={{ height: 40 }} />
            </Div>
          </div>
        )}
      </ModalPage>
    </ModalRoot>
  );

  return (
    <ConfigProvider colorScheme={appearance}>
      <AdaptivityProvider>
        <AppRoot>
          <SplitLayout modal={modal}>
            <SplitCol>
              <Epic
                activeStory={activeStory}
                tabbar={
                  <Tabbar>
                    <TabbarItem
                      onClick={() => onStoryChange('home')}
                      selected={activeStory === 'home'}
                      data-testid="home-tab"
                    >
                      <Icon28NewsfeedOutline />
                      <div style={{ fontSize: 10 }}>Главная</div>
                    </TabbarItem>
                    <TabbarItem
                      onClick={() => onStoryChange('services')}
                      selected={activeStory === 'services'}
                      data-testid="services-tab"
                    >
                      <Icon28ServicesOutline />
                      <div style={{ fontSize: 10 }}>Сервисы</div>
                    </TabbarItem>
                    <TabbarItem
                      onClick={() => onStoryChange('profile')}
                      selected={activeStory === 'profile'}
                      data-testid="profile-tab"
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
                <View id="profile" activePanel={activeProfilePanel}>
                  <Profile id="profile" onNavigate={(panel) => setActiveProfilePanel(panel)} />
                  <Grimoire
                    id="grimoire"
                    onBack={() => setActiveProfilePanel('profile')}
                    onItemClick={(item) => {
                      setSelectedReading(item);
                      setActiveModal(MODAL_PAGE_GRIMOIRE_DETAILS);
                    }}
                  />
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
