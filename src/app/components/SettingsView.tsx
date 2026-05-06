import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { ArrowLeft, User, Bell, Moon, Eye, Upload, FileText, Shield, LogOut } from 'lucide-react';

interface UserProfile {
  name: string;
  major: string;
  phase: string;
  interests: string[];
}

interface OutletContext {
  userProfile: UserProfile;
}

export function SettingsView() {
  const { userProfile } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  const isLoggedIn = userProfile && userProfile.name;

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [visibility, setVisibility] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('dhbw_onboarded');
    localStorage.removeItem('dhbw_profile');
    window.location.href = '/';
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log('Uploading phase plan PDF:', file.name);
      // TODO: Upload to Supabase
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="h-full flex flex-col bg-background">
        {/* Header */}
        <div className="px-6 lg:px-8 pt-12 lg:pt-8 pb-6 bg-white border-b border-border max-w-4xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={() => navigate('/')}
              className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-2xl text-foreground">Settings</h2>
          </div>
        </div>

        {/* Not Logged In State */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-foreground text-3xl mb-4">
            <User className="w-10 h-10" />
          </div>
          <h3 className="text-xl text-foreground mb-2">Not signed in</h3>
          <p className="text-muted-foreground mb-6 max-w-sm">
            Sign in to access settings and personalize your experience
          </p>
          <button
            onClick={() => navigate('/login')}
            className="bg-primary text-white px-8 py-3 rounded-xl hover:bg-red-700 transition-colors"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="px-6 lg:px-8 pt-12 lg:pt-8 pb-4 bg-white border-b border-border max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="lg:hidden w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="text-2xl lg:text-3xl text-foreground">Settings</h2>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 lg:px-8 py-6 max-w-4xl mx-auto w-full">
        <button
          onClick={() => navigate('/profile/edit')}
          className="w-full bg-white rounded-2xl p-6 border border-border hover:bg-secondary transition-colors text-left"
        >
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-white text-3xl flex-shrink-0">
              {userProfile.name[0]}
            </div>
            <div className="flex-1">
              <h3 className="text-xl text-foreground mb-1">{userProfile.name}</h3>
              <p className="text-sm text-muted-foreground">
                {userProfile.major} – DHBW Mannheim
              </p>
            </div>
            <div className="text-muted-foreground">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </button>
      </div>

      {/* Studien-Setup Section */}
      <div className="px-6 lg:px-8 pb-6 max-w-4xl mx-auto w-full">
        <h4 className="text-sm font-medium text-muted-foreground mb-3 px-2">Studien-Setup</h4>
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <input
            type="file"
            id="phase-plan-pdf"
            accept=".pdf"
            onChange={handlePdfUpload}
            className="hidden"
          />
          <label
            htmlFor="phase-plan-pdf"
            className="w-full px-5 py-4 flex items-center gap-3 cursor-pointer hover:bg-secondary transition-colors"
          >
            <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
              <Upload className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Phasenplan PDF hochladen</p>
              <p className="text-sm text-muted-foreground">Deinen Studienplan teilen</p>
            </div>
          </label>
        </div>
      </div>

      {/* Settings List */}
      <div className="px-6 lg:px-8 pb-6 max-w-4xl mx-auto w-full">
        <h4 className="text-sm font-medium text-muted-foreground mb-3 px-2">App-Einstellungen</h4>
        <div className="bg-white rounded-2xl border border-border overflow-hidden divide-y divide-border">
          {/* Notifications */}
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-50 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Mitteilungen</p>
              <p className="text-sm text-muted-foreground">Push-Benachrichtigungen</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Dark Mode */}
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
              <Moon className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Dunkelmodus</p>
              <p className="text-sm text-muted-foreground">Dunkles Design aktivieren</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>

          {/* Visibility */}
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
              <Eye className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">Sichtbarkeit</p>
              <p className="text-sm text-muted-foreground">Who's in Town anzeigen</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={visibility}
                onChange={(e) => setVisibility(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-6 pb-6">
        <button
          onClick={handleLogout}
          className="w-full bg-primary hover:bg-red-700 text-white py-4 rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Abmelden
        </button>
      </div>

      {/* Footer Links */}
      <div className="px-6 pb-8">
        <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <button className="hover:text-foreground transition-colors">
            Impressum
          </button>
          <span>•</span>
          <button className="hover:text-foreground transition-colors">
            Datenschutz
          </button>
        </div>
      </div>
    </div>
  );
}
