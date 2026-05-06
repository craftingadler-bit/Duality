import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload, X, Calendar, MapPin, Users, Clock, Sparkles } from 'lucide-react';

export function CreateEventView() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [maxAttendees, setMaxAttendees] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [isSponsored, setIsSponsored] = useState(false);

  const categories = [
    { id: 'Sports', emoji: '⚽', color: 'bg-green-500' },
    { id: 'Gaming', emoji: '🎮', color: 'bg-purple-500' },
    { id: 'Party', emoji: '🎉', color: 'bg-pink-500' },
    { id: 'Art', emoji: '🎨', color: 'bg-orange-500' },
    { id: 'Study', emoji: '📚', color: 'bg-blue-500' },
    { id: 'Food', emoji: '🍕', color: 'bg-yellow-500' }
  ];

  const tagOptions = [
    'Outdoor', 'Indoor', 'Free', 'Beginner friendly',
    'All levels', 'DHBW only', 'Food included', 'Drinks included'
  ];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages(prev => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const toggleTag = (tag: string) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async () => {
    const eventData = {
      title,
      description,
      category,
      date,
      time,
      location,
      address,
      max_attendees: parseInt(maxAttendees),
      image: images[0] || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop', // Use first image or placeholder
      image_urls: images,
      tags,
      is_sponsored: isSponsored,
      host_name: 'DHBW Student', // TODO: Get from user context
      user_id: 'temp-user-id' // TODO: Get from auth
    };

    console.log('Creating event:', eventData);

    try {
      // Use the API helper
      const { eventsAPI } = await import('../../lib/api');
      const { data, error } = await eventsAPI.create(eventData);

      if (error) {
        console.error('Error creating event:', error);
        alert('Fehler beim Erstellen des Events: ' + error);
        return;
      }

      console.log('Event created successfully:', data);
      alert('Event erfolgreich erstellt! 🎉');
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Fehler beim Erstellen des Events. Bitte versuche es erneut.');
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return title && description && category;
      case 2:
        return date && time && location && maxAttendees;
      case 3:
        return images.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 lg:px-8 pt-12 lg:pt-8 pb-4 bg-white border-b border-border max-w-4xl mx-auto w-full">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => step === 1 ? navigate('/events') : setStep(step - 1)}
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl lg:text-3xl text-foreground">Event erstellen</h2>
            <p className="text-sm text-muted-foreground">Schritt {step} von 3</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-secondary'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-6 max-w-4xl mx-auto w-full">
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Event-Details</h3>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Event-Titel</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z.B. Volleyball am Neckarwiese"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Beschreibung</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Was wird bei deinem Event passieren?"
                rows={4}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Kategorie</label>
              <div className="grid grid-cols-3 gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      category === cat.id
                        ? `${cat.color} text-white border-transparent`
                        : 'bg-secondary text-foreground border-border'
                    }`}
                  >
                    <div className="text-3xl mb-1">{cat.emoji}</div>
                    <div className="text-sm font-medium">{cat.id}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Time & Place */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Zeit & Ort</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Datum</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Uhrzeit</label>
                <div className="relative">
                  <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Ort</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="z.B. Neckarwiese"
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Adresse (optional)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Genaue Adresse"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Max. Teilnehmer</label>
              <div className="relative">
                <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="number"
                  value={maxAttendees}
                  onChange={(e) => setMaxAttendees(e.target.value)}
                  placeholder="z.B. 20"
                  min="1"
                  className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Tags</label>
              <div className="grid grid-cols-2 gap-2">
                {tagOptions.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      tags.includes(tag)
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground border border-border'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Images */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Event-Fotos</h3>

            <input
              type="file"
              id="event-images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            {images.length === 0 ? (
              <label
                htmlFor="event-images"
                className="block w-full h-64 border-2 border-dashed border-border rounded-2xl hover:border-primary transition-colors cursor-pointer"
              >
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Fotos hochladen</h4>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Füge Fotos hinzu, um dein Event attraktiver zu machen
                  </p>
                </div>
              </label>
            ) : (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-video bg-muted rounded-xl overflow-hidden group">
                      <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
                <label
                  htmlFor="event-images"
                  className="block w-full py-3 px-4 bg-secondary text-foreground rounded-xl text-center cursor-pointer hover:bg-muted transition-colors"
                >
                  Weitere Fotos hinzufügen
                </label>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">Event-Tipp</h4>
                  <p className="text-sm text-blue-700">
                    Events mit Fotos bekommen 3x mehr Teilnehmer! Zeige die Location oder frühere Events.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 lg:px-8 py-4 border-t border-border bg-white max-w-4xl mx-auto w-full">
        <button
          onClick={() => {
            if (step < 3) {
              setStep(step + 1);
            } else {
              handleSubmit();
            }
          }}
          disabled={!isStepValid()}
          className="w-full bg-primary hover:bg-red-700 text-white py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {step < 3 ? 'Weiter' : 'Event erstellen'}
        </button>
      </div>
    </div>
  );
}
