import { useOutletContext, useNavigate } from 'react-router';
import { Settings, Edit, Heart, Calendar, Home as HomeIcon, Trophy } from 'lucide-react';

interface UserProfile {
  name: string;
  major: string;
  phase: string;
  interests: string[];
}

interface OutletContext {
  userProfile: UserProfile;
}

export function ProfileView() {
  const { userProfile } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const stats = [
    { label: 'Events Joined', value: 12, icon: Calendar },
    { label: 'Connections', value: 24, icon: Heart },
    { label: 'Housing Matches', value: 3, icon: HomeIcon }
  ];

  const interestEmojis: Record<string, string> = {
    party: '🎉',
    sports: '⚽',
    gaming: '🎮',
    art: '🎨',
    music: '🎵',
    food: '🍕',
    travel: '✈️',
    tech: '💻'
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-purple-600 text-white px-6 pt-12 pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl">Profile</h2>
          <button className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-6 -mt-12">
        <div className="bg-card rounded-3xl p-6 shadow-lg border border-border">
          {/* Avatar */}
          <div className="flex items-start gap-4 mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center text-white text-3xl">
              {userProfile.name[0]}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl mb-1">{userProfile.name}</h3>
              <p className="text-muted-foreground mb-2">{userProfile.major}</p>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                {userProfile.phase}
              </div>
            </div>
            <button className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
              <Edit className="w-4 h-4" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6 pb-6 border-b border-border">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="text-center">
                  <Icon className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="text-2xl mb-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground leading-tight">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Interests */}
          <div>
            <h4 className="mb-3">My Interests</h4>
            <div className="flex flex-wrap gap-2">
              {userProfile.interests.map((interest) => (
                <div key={interest} className="px-4 py-2 bg-secondary rounded-xl flex items-center gap-2">
                  <span className="text-lg">{interestEmojis[interest] || '✨'}</span>
                  <span className="text-sm capitalize">{interest}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="px-6 py-6">
        <h3 className="mb-3">Achievements</h3>
        <div className="space-y-3">
          <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">Early Adopter</p>
              <p className="text-sm text-muted-foreground">One of the first 100 users</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">Social Butterfly</p>
              <p className="text-sm text-muted-foreground">Joined 10+ events</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-4 border border-border flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium mb-1">Community Helper</p>
              <p className="text-sm text-muted-foreground">5-star average rating</p>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Links */}
      <div className="px-6 pb-8">
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <button className="w-full px-6 py-4 text-left hover:bg-secondary transition-colors border-b border-border">
            Account Settings
          </button>
          <button className="w-full px-6 py-4 text-left hover:bg-secondary transition-colors border-b border-border">
            Notification Preferences
          </button>
          <button className="w-full px-6 py-4 text-left hover:bg-secondary transition-colors border-b border-border">
            Privacy & Safety
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('dhbw_onboarded');
              localStorage.removeItem('dhbw_profile');
              navigate('/onboarding');
            }}
            className="w-full px-6 py-4 text-left text-destructive hover:bg-destructive/10 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
