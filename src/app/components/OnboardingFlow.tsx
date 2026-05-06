import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from 'lucide-react';

interface OnboardingFlowProps {
  onComplete?: (profile: {
    name: string;
    major: string;
    phase: string;
    interests: string[];
  }) => void;
}

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const profile = {
      name: email.split('@')[0].split('.').map(n => n.charAt(0).toUpperCase() + n.slice(1)).join(' '),
      major: 'Computer Science',
      phase: 'A-Phase',
      interests: ['tech', 'gaming', 'sports']
    };

    localStorage.setItem('dhbw_profile', JSON.stringify(profile));
    localStorage.setItem('dhbw_onboarded', 'true');

    if (onComplete) {
      onComplete(profile);
    }
    navigate('/');
  };

  return (
    <div className="size-full bg-background flex flex-col">
      <div className="flex-1 flex flex-col px-6 pt-20 pb-8 max-w-md lg:max-w-lg mx-auto w-full">
        {/* Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <img
              src="/src/imports/ChatGPT_Image_28._Apr._2026,_10_11_33.png"
              alt="Duality Logo"
              className="h-24 w-auto"
            />
          </div>
        </div>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl text-foreground mb-2">Willkommen zurück</h2>
          <p className="text-muted-foreground">Dein Zugang zum DHBW Campusleben</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5 flex-1">
          {/* Email */}
          <div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="deine.name@dhbw.de"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Passwort"
                required
                className="w-full pl-12 pr-12 py-3.5 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-border cursor-pointer accent-primary"
              />
              <span className="text-sm text-muted-foreground">Angemeldet bleiben</span>
            </label>
            <button type="button" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Passwort vergessen?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-primary hover:bg-red-700 text-white py-3.5 rounded-xl transition-colors"
          >
            Mit DHBW-Mail anmelden
          </button>

          {/* Info */}
          <div className="bg-secondary border border-border rounded-xl p-4">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Nur für verifizierte DHBW Studierende mit offizieller Hochschul-Mail
              </p>
            </div>
          </div>

          <div className="flex-1"></div>

          {/* Footer */}
          <div className="text-center pt-6 border-t border-border">
            <p className="text-muted-foreground text-sm">
              Noch kein Konto?{' '}
              <button type="button" className="text-primary hover:underline">
                Registrieren
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
