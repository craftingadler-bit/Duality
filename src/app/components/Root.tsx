import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router';
import { Home, Calendar, ShoppingBag, Building2, User, HelpCircle, Settings } from 'lucide-react';

export function Root() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userProfile, setUserProfile] = useState({
    name: '',
    major: '',
    phase: '',
    interests: [] as string[]
  });

  useEffect(() => {
    const saved = localStorage.getItem('dhbw_profile');
    if (saved) {
      setUserProfile(JSON.parse(saved));
    }
  }, []);

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'events', label: 'Events', icon: Calendar, path: '/events' },
    { id: 'marketplace', label: 'Marketplace', icon: ShoppingBag, path: '/marketplace' },
    { id: 'housing', label: 'Housing', icon: Building2, path: '/housing' }
  ];

  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/housing')) return 'housing';
    if (path.startsWith('/events')) return 'events';
    if (path.startsWith('/marketplace')) return 'marketplace';
    if (path.startsWith('/settings')) return 'home';
    return 'home';
  };

  const activeTab = getActiveTab();
  const isLoggedIn = userProfile && userProfile.name;

  return (
    <div className="size-full flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:border-border lg:bg-card">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <img
            src="/src/imports/ChatGPT_Image_28._Apr._2026,_10_11_33.png"
            alt="Project Connect Logo"
            className="h-12 w-auto cursor-pointer"
            onClick={() => navigate('/')}
          />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive
                    ? 'text-primary bg-primary/10 font-medium'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-border space-y-2">
          <button
            onClick={() => navigate('/faq')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition-colors"
          >
            <HelpCircle className="w-5 h-5" />
            <span>FAQ</span>
          </button>
          <button
            onClick={() => navigate(isLoggedIn ? '/settings' : '/login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition-colors"
          >
            {isLoggedIn ? (
              <>
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                  {userProfile.name[0]}
                </div>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-foreground">{userProfile.name}</p>
                  <p className="text-xs text-muted-foreground">{userProfile.major}</p>
                </div>
              </>
            ) : (
              <>
                <User className="w-5 h-5" />
                <span>Login</span>
              </>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col max-w-full lg:max-w-none">
        {/* Content */}
        <main className="flex-1 overflow-hidden">
          <div className="h-full max-w-7xl mx-auto lg:px-8">
            <Outlet context={{ userProfile }} />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden border-t border-border bg-card">
          <div className="flex items-center justify-around px-2 py-2 safe-area-inset-bottom max-w-md mx-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => navigate(tab.path)}
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
    </div>
  );
}
