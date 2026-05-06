import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload, X, Euro, MapPin, Calendar } from 'lucide-react';

type ListingCategory = 'SERVICE' | 'PHYSICAL' | 'DIGITAL';

export function CreateListingView() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Form state
  const [category, setCategory] = useState<ListingCategory | ''>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isFree, setIsFree] = useState(false);
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [subcategory, setSubcategory] = useState('');
  const [location, setLocation] = useState('');
  const [condition, setCondition] = useState('');
  const [images, setImages] = useState<string[]>([]);
  const [digitalFile, setDigitalFile] = useState<File | null>(null);
  const [hourlyRate, setHourlyRate] = useState('');
  const [serviceDuration, setServiceDuration] = useState('');

  const categories = [
    {
      id: 'SERVICE' as const,
      name: 'Service',
      description: 'Tutoring, Help, Skills',
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      borderColor: 'border-blue-500',
      emoji: '🎓'
    },
    {
      id: 'PHYSICAL' as const,
      name: 'Physical Item',
      description: 'Books, Furniture, Bikes',
      color: 'bg-orange-500',
      hoverColor: 'hover:bg-orange-600',
      borderColor: 'border-orange-500',
      emoji: '📦'
    },
    {
      id: 'DIGITAL' as const,
      name: 'Digital Asset',
      description: 'PDFs, Scripts, Software',
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      borderColor: 'border-purple-500',
      emoji: '💾'
    }
  ];

  const subcategories = {
    SERVICE: ['Tutoring', 'Help with Move', 'Photography', 'Graphic Design', 'Other'],
    PHYSICAL: ['Books', 'Furniture', 'Bikes', 'Electronics', 'Clothing', 'Other'],
    DIGITAL: ['Study Materials', 'Exam Prep', 'Templates', 'Software', 'Other']
  };

  const conditions = ['New', 'Like New', 'Good', 'Fair', 'For Parts'];

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

  const handleDigitalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setDigitalFile(file);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // TODO: Implement Supabase integration
    const listingData = {
      category,
      title,
      description,
      price: isFree ? 0 : parseFloat(price),
      is_free: isFree,
      is_negotiable: isNegotiable,
      subcategory,
      location,
      condition: category === 'PHYSICAL' ? condition : undefined,
      hourly_rate: category === 'SERVICE' ? parseFloat(hourlyRate) : undefined,
      service_duration: category === 'SERVICE' ? parseInt(serviceDuration) : undefined,
      has_digital_asset: category === 'DIGITAL',
      image_urls: images,
      status: 'ACTIVE'
    };

    console.log('Creating listing:', listingData);

    // Simulate API call
    setTimeout(() => {
      navigate('/marketplace');
    }, 500);
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return category !== '';
      case 2:
        return title.length >= 5 && description.length >= 20;
      case 3:
        if (category === 'SERVICE') {
          return hourlyRate && serviceDuration;
        } else if (category === 'PHYSICAL') {
          return condition && location;
        } else if (category === 'DIGITAL') {
          return digitalFile !== null;
        }
        return true;
      default:
        return true;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => step === 1 ? navigate('/marketplace') : setStep(step - 1)}
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl text-foreground">Create Listing</h2>
            <p className="text-sm text-muted-foreground">Step {step} of 3</p>
          </div>
        </div>

        {/* Progress */}
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`flex-1 h-1 rounded-full ${s <= step ? 'bg-primary' : 'bg-secondary'}`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-6">
        {/* Step 1: Category Selection */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground mb-4">What are you offering?</h3>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`w-full p-5 rounded-xl text-left transition-all border-2 ${
                  category === cat.id
                    ? `${cat.color} text-white border-transparent`
                    : 'bg-white border-border text-foreground hover:border-primary'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{cat.emoji}</div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{cat.name}</h4>
                    <p className={`text-sm ${category === cat.id ? 'text-white/80' : 'text-muted-foreground'}`}>
                      {cat.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Basic Info */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., BWL Skript - Complete Summary"
                maxLength={100}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <p className="text-xs text-muted-foreground mt-1">{title.length}/100 characters</p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Description *</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your item or service in detail..."
                rows={5}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
              />
              <p className="text-xs text-muted-foreground mt-1">{description.length} characters (min. 20)</p>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Category</label>
              <select
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
                className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
              >
                <option value="">Select category</option>
                {category && subcategories[category as ListingCategory].map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Price</label>
              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <Euro className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    disabled={isFree}
                    className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
                  />
                </div>
                <label className="flex items-center gap-2 px-4 py-3 bg-secondary rounded-xl cursor-pointer hover:bg-muted transition-colors">
                  <input
                    type="checkbox"
                    checked={isFree}
                    onChange={(e) => setIsFree(e.target.checked)}
                    className="w-4 h-4 rounded accent-primary"
                  />
                  <span className="text-sm text-foreground">Free</span>
                </label>
              </div>

              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNegotiable}
                  onChange={(e) => setIsNegotiable(e.target.checked)}
                  className="w-4 h-4 rounded accent-primary"
                />
                <span className="text-sm text-foreground">Price is negotiable</span>
              </label>
            </div>

            <div>
              <label className="text-sm text-muted-foreground mb-1.5 block">Images (optional)</label>
              <input
                type="file"
                id="images"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="w-full border-2 border-dashed border-border rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-primary transition-colors"
              >
                <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm text-foreground">Upload images</p>
                <p className="text-xs text-muted-foreground">Up to 5 images</p>
              </label>

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mt-3">
                  {images.map((img, i) => (
                    <div key={i} className="relative aspect-square bg-muted rounded-lg overflow-hidden">
                      <img src={img} alt={`Upload ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 w-6 h-6 bg-black/70 rounded-full flex items-center justify-center text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Category-Specific Details */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-foreground mb-4">Additional Details</h3>

            {category === 'SERVICE' && (
              <>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Hourly Rate *</label>
                  <div className="relative">
                    <Euro className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="number"
                      value={hourlyRate}
                      onChange={(e) => setHourlyRate(e.target.value)}
                      placeholder="25.00"
                      className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Typical Session Duration (minutes) *</label>
                  <input
                    type="number"
                    value={serviceDuration}
                    onChange={(e) => setServiceDuration(e.target.value)}
                    placeholder="60"
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                  >
                    <option value="">Select location</option>
                    <option value="Online">Online</option>
                    <option value="Campus">Campus</option>
                    <option value="Lindenhof">Lindenhof</option>
                    <option value="Neckarstadt">Neckarstadt</option>
                    <option value="Quadrate">Quadrate</option>
                    <option value="Jungbusch">Jungbusch</option>
                  </select>
                </div>
              </>
            )}

            {category === 'PHYSICAL' && (
              <>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Condition *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {conditions.map((cond) => (
                      <button
                        key={cond}
                        type="button"
                        onClick={() => setCondition(cond)}
                        className={`px-4 py-3 rounded-xl text-sm transition-colors ${
                          condition === cond
                            ? 'bg-primary text-white'
                            : 'bg-secondary text-foreground border border-border'
                        }`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Pickup Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-input-background border border-border rounded-xl text-foreground focus:border-primary focus:outline-none transition-colors"
                    >
                      <option value="">Select location</option>
                      <option value="Lindenhof">Lindenhof</option>
                      <option value="Neckarstadt">Neckarstadt</option>
                      <option value="Quadrate">Quadrate</option>
                      <option value="Jungbusch">Jungbusch</option>
                      <option value="Almenhof">Almenhof</option>
                      <option value="Campus">Campus</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {category === 'DIGITAL' && (
              <>
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-xl">🔒</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Asset-Safe Protection</p>
                      <p className="text-xs text-muted-foreground">
                        Your file will be securely stored. Buyers can only download after payment confirmation.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Upload Digital File *</label>
                  <input
                    type="file"
                    id="digital-file"
                    onChange={handleDigitalFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="digital-file"
                    className="w-full border-2 border-dashed border-purple-300 bg-purple-50 rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500 transition-colors"
                  >
                    <Upload className="w-8 h-8 text-purple-500 mb-2" />
                    {digitalFile ? (
                      <div className="text-center">
                        <p className="text-sm text-foreground font-medium">{digitalFile.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {(digitalFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <>
                        <p className="text-sm text-foreground">Upload PDF, DOCX, ZIP</p>
                        <p className="text-xs text-muted-foreground">Max 50 MB</p>
                      </>
                    )}
                  </label>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border bg-white">
        <button
          onClick={() => {
            if (step < 3) {
              setStep(step + 1);
            } else {
              handleSubmit();
            }
          }}
          disabled={!isStepValid()}
          className="w-full bg-primary hover:bg-red-700 text-white py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {step < 3 ? 'Continue' : 'Create Listing'}
        </button>
      </div>
    </div>
  );
}
