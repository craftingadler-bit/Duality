import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router';
import { ArrowLeft, Camera, X } from 'lucide-react';

interface UserProfile {
  name: string;
  major: string;
  phase: string;
  interests: string[];
}

interface OutletContext {
  userProfile: UserProfile;
}

export function EditProfileView() {
  const navigate = useNavigate();
  const { userProfile } = useOutletContext<OutletContext>();

  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [major, setMajor] = useState('');
  const [semester, setSemester] = useState('');
  const [phase, setPhase] = useState('');
  const [bio, setBio] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [lifestyle, setLifestyle] = useState('');

  useEffect(() => {
    // Load current profile data
    if (userProfile) {
      const nameParts = userProfile.name.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
      setMajor(userProfile.major || '');
      setPhase(userProfile.phase || '');
      setSelectedInterests(userProfile.interests || []);
    }
  }, [userProfile]);

  const majors = [
    'Computer Science',
    'Business Administration',
    'Engineering',
    'International Business',
    'Digital Business',
    'Mechanical Engineering'
  ];

  const phases = ['A-Phase', 'B-Phase'];

  const interests = [
    { id: 'party', label: 'Party', emoji: '🎉' },
    { id: 'sports', label: 'Sports', emoji: '⚽' },
    { id: 'gaming', label: 'Gaming', emoji: '🎮' },
    { id: 'art', label: 'Art', emoji: '🎨' },
    { id: 'music', label: 'Music', emoji: '🎵' },
    { id: 'food', label: 'Food', emoji: '🍕' },
    { id: 'travel', label: 'Travel', emoji: '✈️' },
    { id: 'tech', label: 'Tech', emoji: '💻' }
  ];

  const lifestyles = ['Party machen', 'Entspannt', 'Kreativ', 'Sportlich', 'Gemischt'];

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

  const handleSave = () => {
    const updatedProfile = {
      name: `${firstName} ${lastName}`,
      major,
      phase,
      interests: selectedInterests,
      semester: parseInt(semester) || undefined,
      bio,
      lifestyle
    };

    // Save to localStorage
    localStorage.setItem('dhbw_profile', JSON.stringify(updatedProfile));

    // TODO: Save to Supabase
    console.log('Saving profile:', updatedProfile);

    // Navigate back
    navigate('/settings');
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/settings')}
              className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h2 className="text-2xl text-foreground">Edit Profile</h2>
              <p className="text-sm text-muted-foreground">Update your information</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Save
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-8">
          <input
            type="file"
            id="profile-image"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="profile-image"
            className="relative w-32 h-32 rounded-full cursor-pointer group mb-3"
          >
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="w-full h-full object-cover rounded-full" />
            ) : (
              <div className="w-full h-full bg-primary rounded-full flex items-center justify-center text-white text-4xl">
                {firstName[0] || userProfile.name[0]}
              </div>
            )}
            <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-8 h-8 text-white" />
            </div>
          </label>
          <p className="text-sm text-muted-foreground">Tap to change photo</p>
        </div>

        {/* Personal Info */}
        <div className="space-y-5 mb-6">
          <h3 className="font-medium text-foreground">Personal Information</h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself..."
              rows={3}
              className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>

        {/* Study Info */}
        <div className="space-y-5 mb-6">
          <h3 className="font-medium text-foreground">Study Information</h3>

          <div>
            <label className="text-sm text-muted-foreground mb-1.5 block">Major</label>
            <select
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
            >
              <option value="">Select major</option>
              {majors.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Select</option>
                {[1, 2, 3, 4, 5, 6].map((s) => (
                  <option key={s} value={s}>{s}. Semester</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Phase</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Select</option>
                {phases.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-5 mb-6">
          <h3 className="font-medium text-foreground">Interests</h3>
          <div className="grid grid-cols-2 gap-2">
            {interests.map((interest) => (
              <button
                key={interest.id}
                type="button"
                onClick={() => toggleInterest(interest.id)}
                className={`px-4 py-3 rounded-xl text-sm flex items-center gap-2 transition-colors ${
                  selectedInterests.includes(interest.id)
                    ? 'bg-primary text-white'
                    : 'bg-white text-foreground border border-border'
                }`}
              >
                <span>{interest.emoji}</span>
                <span>{interest.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Lifestyle */}
        <div className="space-y-5 mb-6">
          <h3 className="font-medium text-foreground">Lifestyle</h3>
          <div className="space-y-2">
            {lifestyles.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLifestyle(l)}
                className={`w-full px-4 py-3 rounded-xl text-sm text-left transition-colors ${
                  lifestyle === l
                    ? 'bg-primary text-white'
                    : 'bg-white text-foreground border border-border'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* Spacer for save button */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
