import { createBrowserRouter } from 'react-router';
import { Root } from './components/Root';
import { OnboardingFlow } from './components/OnboardingFlow';
import { RegisterFlow } from './components/RegisterFlow';
import { HomeView } from './components/HomeView';
import { HousingView } from './components/HousingView';
import { HousingDetail } from './components/HousingDetail';
import { CreateHousingView } from './components/CreateHousingView';
import { EventsView } from './components/EventsView';
import { EventDetail } from './components/EventDetail';
import { CreateEventView } from './components/CreateEventView';
import { MarketplaceView } from './components/MarketplaceView';
import { MarketplaceDetail } from './components/MarketplaceDetail';
import { CreateListingView } from './components/CreateListingView';
import { SettingsView } from './components/SettingsView';
import { EditProfileView } from './components/EditProfileView';
import { FAQView } from './components/FAQView';
import { MapView } from './components/MapView';

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <OnboardingFlow />
  },
  {
    path: '/register',
    element: <RegisterFlow />
  },
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <HomeView /> },
      { path: 'events', element: <EventsView /> },
      { path: 'events/create', element: <CreateEventView /> },
      { path: 'events/:id', element: <EventDetail /> },
      { path: 'marketplace', element: <MarketplaceView /> },
      { path: 'marketplace/create', element: <CreateListingView /> },
      { path: 'marketplace/:id', element: <MarketplaceDetail /> },
      { path: 'housing', element: <HousingView /> },
      { path: 'housing/create', element: <CreateHousingView /> },
      { path: 'housing/:id', element: <HousingDetail /> },
      { path: 'settings', element: <SettingsView /> },
      { path: 'profile/edit', element: <EditProfileView /> },
      { path: 'faq', element: <FAQView /> },
      { path: 'map', element: <MapView /> }
    ]
  }
]);