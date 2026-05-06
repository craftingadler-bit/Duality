import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Camera, ChevronRight, ChevronLeft } from 'lucide-react';

export function RegisterFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Form data
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [campus, setCampus] = useState('');
  const [major, setMajor] = useState('');
  const [semester, setSemester] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState('');
  const [phase, setPhase] = useState('');
  const [bio, setBio] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [confirmStudent, setConfirmStudent] = useState(false);

  const campuses = ['Mannheim', 'Stuttgart', 'Karlsruhe', 'Heilbronn', 'Mosbach', 'Ravensburg', 'Heidenheim', 'Lörrach', 'Villingen-Schwenningen'];
  const majors = ['BWL', 'Informatik', 'Wirtschaftsinformatik', 'Maschinenbau', 'Elektrotechnik', 'Medien', 'Gesundheit', 'Sozialwesen'];
  const interests = [
    { id: 'sport', label: 'Sport', emoji: '⚽' },
    { id: 'party', label: 'Party', emoji: '🎉' },
    { id: 'fitness', label: 'Fitness', emoji: '💪' },
    { id: 'travel', label: 'Reisen', emoji: '✈️' },
    { id: 'learning', label: 'Lernen', emoji: '📚' },
    { id: 'gaming', label: 'Gaming', emoji: '🎮' },
    { id: 'music', label: 'Musik', emoji: '🎵' },
    { id: 'cooking', label: 'Kochen', emoji: '🍳' },
    { id: 'art', label: 'Kunst', emoji: '🎨' },
    { id: 'networking', label: 'Networking', emoji: '🤝' }
  ];
  const lifestyles = ['Party machen', 'Entspannt', 'Kreativ', 'Sportlich', 'Gemischt'];
  const phases = ['Theoriephase', 'Praxisphase', 'Auslandssemester'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    const profile = {
      name: `${firstName} ${lastName}`,
      major,
      phase,
      interests: selectedInterests
    };

    localStorage.setItem('dhbw_profile', JSON.stringify(profile));
    localStorage.setItem('dhbw_onboarded', 'true');
    navigate('/');
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return firstName && lastName && email && password && confirmPassword && password === confirmPassword;
      case 2:
        return campus && major && semester;
      case 3:
        return selectedInterests.length > 0 && lifestyle && phase;
      case 4:
        return acceptTerms && confirmStudent;
      default:
        return false;
    }
  };

  return (
    <div className="size-full bg-background flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-6 lg:px-8 pt-12 pb-6 bg-white border-b border-border max-w-3xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}
          <div className={step === 1 ? 'mx-auto' : ''}>
            <img
              src="/src/imports/ChatGPT_Image_28._Apr._2026,_10_11_33.png"
              alt="Duality Logo"
              className="h-12 w-auto"
            />
          </div>
          <div className="w-10"></div>
        </div>
        <h2 className="text-2xl text-foreground text-center">Konto erstellen</h2>
        <p className="text-muted-foreground text-center text-sm mt-1">Werde Teil der DHBW Community</p>

        {/* Progress */}
        <div className="flex gap-2 mt-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-secondary'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-3xl mx-auto w-full">
        {/* Step 1: Personal Data + Profile Picture */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Profile Picture Upload */}
            <div className="flex flex-col items-center mb-6">
              <input
                type="file"
                id="profile-pic"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="profile-pic"
                className="w-32 h-32 rounded-full border-2 border-dashed border-primary bg-secondary flex items-center justify-center cursor-pointer hover:bg-muted transition-colors mb-3 overflow-hidden relative group"
              >
                {profileImage ? (
                  <>
                    <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </>
                ) : (
                  <Camera className="w-10 h-10 text-primary" />
                )}
              </label>
              <p className="text-sm font-medium text-foreground mb-1">Profilbild hinzufügen</p>
              <p className="text-xs text-muted-foreground">Später überspringen</p>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Vorname</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Max"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Nachname</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Mustermann"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">DHBW E-Mail-Adresse</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="max.mustermann@dhbw.de"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Passwort erstellen</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mindestens 8 Zeichen"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Passwort bestätigen</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Passwort wiederholen"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-xs text-destructive mt-1">Passwörter stimmen nicht überein</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Study Info */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Studienbezogene Angaben</h3>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">DHBW Standort</label>
              <select
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors appearance-none"
              >
                <option value="">Standort wählen</option>
                {campuses.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Studiengang</label>
              <select
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors appearance-none"
              >
                <option value="">Studiengang wählen</option>
                {majors.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors appearance-none"
              >
                <option value="">Semester wählen</option>
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <option key={s} value={s}>{s}. Semester</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Community/Matching */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Community & Matching</h3>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Interessen auswählen</label>
              <div className="grid grid-cols-2 gap-2">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    type="button"
                    onClick={() => toggleInterest(interest.id)}
                    className={`px-4 py-3 rounded-xl text-sm flex items-center gap-2 transition-colors ${
                      selectedInterests.includes(interest.id)
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground border border-border'
                    }`}
                  >
                    <span>{interest.emoji}</span>
                    <span>{interest.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Freizeittyp</label>
              <div className="space-y-2">
                {lifestyles.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLifestyle(l)}
                    className={`w-full px-4 py-3 rounded-xl text-sm text-left transition-colors ${
                      lifestyle === l
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground border border-border'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Aktuelle Phase</label>
              <div className="space-y-2">
                {phases.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setPhase(p)}
                    className={`w-full px-4 py-3 rounded-xl text-sm text-left transition-colors ${
                      phase === p
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground border border-border'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Bio & Confirmation */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Finalisierung</h3>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Über mich (optional)</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Erzähl etwas über dich..."
                rows={4}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-5 h-5 rounded border-border mt-0.5 cursor-pointer accent-primary"
                />
                <span className="text-sm text-foreground leading-relaxed">
                  Ich akzeptiere die <span className="text-primary">AGB</span> und{' '}
                  <span className="text-primary">Datenschutzerklärung</span>
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmStudent}
                  onChange={(e) => setConfirmStudent(e.target.checked)}
                  className="w-5 h-5 rounded border-border mt-0.5 cursor-pointer accent-primary"
                />
                <span className="text-sm text-foreground leading-relaxed">
                  Ich bin eingeschriebener DHBW Student
                </span>
              </label>
            </div>

            {/* Summary */}
            <div className="bg-secondary rounded-xl p-4 border border-border">
              <p className="text-sm font-medium text-foreground mb-2">Zusammenfassung</p>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>📧 {email}</p>
                <p>🎓 {major} • {semester}. Semester</p>
                <p>📍 {campus}</p>
                <p>🎯 {selectedInterests.length} Interessen</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 lg:px-8 py-4 border-t border-border bg-white max-w-3xl mx-auto w-full">
        <button
          onClick={() => {
            if (step < 4) {
              setStep(step + 1);
            } else {
              handleSubmit();
            }
          }}
          disabled={!isStepValid()}
          className="w-full bg-primary hover:bg-red-700 text-white py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step < 4 ? (
            <>
              Weiter
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            'Konto erstellen'
          )}
        </button>

        <p className="text-center text-muted-foreground text-sm mt-4">
          Bereits registriert?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className="text-primary hover:underline"
          >
            Jetzt einloggen
          </button>
        </p>
      </div>
    </div>
  );
}
