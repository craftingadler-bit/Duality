import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload, X, Euro, MapPin, Calendar, Users, Home, Sparkles } from 'lucide-react';

export function CreateHousingView() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form state
  const [listingType, setListingType] = useState<'partner' | 'apartment' | ''>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [size, setSize] = useState('');
  const [availablePhase, setAvailablePhase] = useState<'A-Phase' | 'B-Phase' | 'Both'>('A-Phase');
  const [images, setImages] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [availabilityMonths, setAvailabilityMonths] = useState<string[]>([]);

  const locations = [
    'Lindenhof', 'Neckarstadt', 'Jungbusch', 'Quadrate',
    'Schwetzingerstadt', 'Feudenheim', 'Käfertal', 'Other'
  ];

  const featureOptions = [
    'Furnished', 'WiFi', 'Kitchen', 'Balcony', 'Dishwasher',
    'Washing Machine', 'Parking', 'Tram', 'Bike Storage', 'Garden'
  ];

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
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

  const toggleFeature = (feature: string) => {
    setFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const toggleMonth = (month: string) => {
    setAvailabilityMonths(prev =>
      prev.includes(month)
        ? prev.filter(m => m !== month)
        : [...prev, month]
    );
  };

  const handleSubmit = async () => {
    const housingData = {
      type: listingType,
      title,
      description,
      price: parseFloat(price),
      location,
      address,
      size,
      available_phase: availablePhase,
      features,
      availability_months: availabilityMonths,
      image_urls: images,
      user_id: 'temp-user-id', // TODO: Get from auth
      match_score: 85 // TODO: Calculate based on user profile
    };

    console.log('Creating housing listing:', housingData);

    try {
      // Use the API helper
      const { housingAPI } = await import('/src/lib/api');
      const { data, error } = await housingAPI.create(housingData);

      if (error) {
        console.error('Error creating housing:', error);
        alert('Fehler beim Erstellen des Inserats: ' + error);
        return;
      }

      console.log('Housing created successfully:', data);
      navigate('/housing');
    } catch (error) {
      console.error('Error creating housing:', error);
      alert('Fehler beim Erstellen des Inserats');
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return listingType !== '';
      case 2:
        return title && description && price && location && size;
      case 3:
        return availabilityMonths.length > 0;
      case 4:
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
            onClick={() => step === 1 ? navigate('/housing') : setStep(step - 1)}
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl lg:text-3xl text-foreground">Wohnung inserieren</h2>
            <p className="text-sm text-muted-foreground">
              {listingType === 'partner' ? 'Phase-Share Partner finden' :
               listingType === 'apartment' ? 'Ganze Wohnung vermieten' :
               'Schritt ' + step + ' von 4'}
            </p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
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
        {/* Step 1: Type Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">Was möchtest du anbieten?</h3>

            <button
              onClick={() => setListingType('partner')}
              className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                listingType === 'partner'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-2xl">
                  🤝
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Phase-Share Partner</h4>
                  <p className="text-sm text-muted-foreground">
                    Teile dein Zimmer mit jemandem, der in der anderen Phase da ist
                  </p>
                  <div className="mt-3 flex gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                      Günstigste Option
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                      Empfohlen
                    </span>
                  </div>
                </div>
              </div>
            </button>

            <button
              onClick={() => setListingType('apartment')}
              className={`w-full p-6 rounded-2xl border-2 transition-all text-left ${
                listingType === 'apartment'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-2xl">
                  🏠
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">Ganze Wohnung</h4>
                  <p className="text-sm text-muted-foreground">
                    Vermiete eine komplette Wohnung an Studierende
                  </p>
                  <div className="mt-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                      Flexibel
                    </span>
                  </div>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Step 2: Basic Info */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Basis-Informationen</h3>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Titel des Inserats</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="z.B. Gemütliches Zimmer in Lindenhof"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Beschreibung</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Beschreibe deine Wohnung/dein Zimmer..."
                rows={4}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Preis pro Monat</label>
                <div className="relative">
                  <Euro className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="450"
                    className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Größe (m²)</label>
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  placeholder="18"
                  className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Stadtteil</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors appearance-none"
              >
                <option value="">Stadtteil wählen</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Adresse (optional)</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Meerfeldstraße 15"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Ausstattung</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {featureOptions.map((feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => toggleFeature(feature)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      features.includes(feature)
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground border border-border'
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Availability */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Verfügbarkeit</h3>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Verfügbar für Phase</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setAvailablePhase('A-Phase')}
                  className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                    availablePhase === 'A-Phase'
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-foreground border border-border'
                  }`}
                >
                  A-Phase
                </button>
                <button
                  onClick={() => setAvailablePhase('B-Phase')}
                  className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                    availablePhase === 'B-Phase'
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-foreground border border-border'
                  }`}
                >
                  B-Phase
                </button>
                <button
                  onClick={() => setAvailablePhase('Both')}
                  className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                    availablePhase === 'Both'
                      ? 'bg-primary text-white'
                      : 'bg-secondary text-foreground border border-border'
                  }`}
                >
                  Beide
                </button>
              </div>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-2 block">
                Verfügbare Monate
                {availabilityMonths.length > 0 && (
                  <span className="ml-2 text-primary">({availabilityMonths.length} ausgewählt)</span>
                )}
              </label>
              <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                {months.map((month) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => toggleMonth(month)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      availabilityMonths.includes(month)
                        ? 'bg-green-500 text-white'
                        : 'bg-secondary text-foreground border border-border'
                    }`}
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>

            {listingType === 'partner' && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Phase-Share Tipp</h4>
                    <p className="text-sm text-blue-700">
                      Wähle die Monate aus, in denen du NICHT da bist.
                      So findet unser Algorithmus den perfekten Partner!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Images */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground">Fotos hochladen</h3>

            <input
              type="file"
              id="housing-images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="hidden"
            />

            {images.length === 0 ? (
              <label
                htmlFor="housing-images"
                className="block w-full h-64 border-2 border-dashed border-border rounded-2xl hover:border-primary transition-colors cursor-pointer"
              >
                <div className="h-full flex flex-col items-center justify-center text-center p-6">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">Fotos hochladen</h4>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Füge mindestens ein Foto hinzu. Gute Fotos erhöhen deine Chancen!
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
                  htmlFor="housing-images"
                  className="block w-full py-3 px-4 bg-secondary text-foreground rounded-xl text-center cursor-pointer hover:bg-muted transition-colors"
                >
                  Weitere Fotos hinzufügen
                </label>
              </div>
            )}

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex gap-3">
                <Home className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-medium text-green-900 mb-1">Foto-Tipps</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Helle, gut beleuchtete Fotos</li>
                    <li>• Zeige alle Räume und Besonderheiten</li>
                    <li>• Aufgeräumte Umgebung macht guten Eindruck</li>
                  </ul>
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
            if (step < 4) {
              setStep(step + 1);
            } else {
              handleSubmit();
            }
          }}
          disabled={!isStepValid()}
          className="w-full bg-primary hover:bg-red-700 text-white py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
        >
          {step < 4 ? 'Weiter' : 'Inserat erstellen'}
        </button>
      </div>
    </div>
  );
}
