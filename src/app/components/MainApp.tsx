import { useState } from 'react';
import { Home, MapPin, Calendar, ShoppingBag, User } from 'lucide-react';
import { HomeView } from './HomeView';
import { HousingView } from './HousingView';
import { EventsView } from './EventsView';
import { MapView } from './MapView';
import { ProfileView } from './ProfileView';

interface MainAppProps {
  userProfile: {
    name: string;
    major: string;
    phase: string;
    interests: string[];
  };
}

export function MainApp({ userProfile }: MainAppProps) {
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'housing', label: 'Housing', icon: Home },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'map', label: 'Map', icon: MapPin },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="size-full flex flex-col bg-background max-w-md mx-auto">
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {activeTab === 'home' && <HomeView userProfile={userProfile} onNavigate={setActiveTab} />}
        {activeTab === 'housing' && <HousingView userProfile={userProfile} />}
        {activeTab === 'events' && <EventsView userProfile={userProfile} />}
        {activeTab === 'map' && <MapView />}
        {activeTab === 'profile' && <ProfileView userProfile={userProfile} />}
      </div>

      {/* Bottom Navigation */}
      <div className="border-t border-border bg-card">
        <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-colors ${
                  isActive ? 'text-primary bg-primary/10' : 'text-muted-foreground'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
