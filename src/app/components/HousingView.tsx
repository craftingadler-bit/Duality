import { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { Filter, MapPin, Euro, Calendar, Heart, Star, Users, Clock, TrendingUp, Map, Plus, X, Sliders } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

interface UserProfile {
  name: string;
  major: string;
  phase: string;
  interests: string[];
}

interface OutletContext {
  userProfile: UserProfile;
}

export function HousingView() {
  const { userProfile } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const [view, setView] = useState<'list' | 'map'>('list');
  const [filterType, setFilterType] = useState<'all' | 'partner' | 'apartment'>('all');
  const [filterPhase, setFilterPhase] = useState<string>(
    userProfile.phase === 'A-Phase' ? 'B-Phase' : 'A-Phase'
  );
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [sizeRange, setSizeRange] = useState<[number, number]>([0, 100]);
  const [matchScoreMin, setMatchScoreMin] = useState(0);

  const listings = [
  {
    "id": 1,
    "title": "Cozy Room in Lindenhof",
    "type": "partner",
    "price": 450,
    "availablePhase": "B-Phase",
    "location": "Lindenhof",
    "address": "Meerfeldstraße 15",
    "images": ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
    "roommate": "Lisa M.",
    "matchScore": 95,
    "features": ["Furnished", "WiFi", "Kitchen"],
    "distance": "1.2 km",
    "travelTime": "8 min",
    "size": "18m²",
    "availability": { "months": ["Jul", "Aug", "Sep"], "color": "green" }
  },
  {
    "id": 2,
    "title": "Modern Apartment Share",
    "type": "partner",
    "price": 520,
    "availablePhase": "A-Phase",
    "location": "Neckarstadt",
    "address": "Lange Rötterstraße 42",
    "images": ["https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"],
    "roommate": "Tom K.",
    "matchScore": 88,
    "features": ["Balcony", "Dishwasher", "Tram"],
    "distance": "2.5 km",
    "travelTime": "12 min",
    "size": "20m²",
    "availability": { "months": ["Oct", "Nov", "Dec"], "color": "green" }
  },
  {
    "id": 3,
    "title": "Whole Apartment Available",
    "type": "apartment",
    "price": 850,
    "availablePhase": "Both",
    "location": "Quadrate",
    "address": "M7, 24",
    "images": ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
    "roommate": null,
    "matchScore": 70,
    "features": ["2 Rooms", "City Center", "Elevator"],
    "distance": "3.1 km",
    "travelTime": "15 min",
    "size": "55m²",
    "availability": { "months": ["All Year"], "color": "blue" }
  },
  {
    "id": 4,
    "title": "Artist Loft Room",
    "type": "partner",
    "price": 400,
    "availablePhase": "B-Phase",
    "location": "Jungbusch",
    "address": "Beilstraße 12",
    "images": ["https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800"],
    "roommate": "Marc U.",
    "matchScore": 92,
    "features": ["High Ceilings", "Bars nearby", "Bike Storage"],
    "distance": "3.8 km",
    "travelTime": "18 min",
    "size": "22m²",
    "availability": { "months": ["Apr", "May", "Jun"], "color": "green" }
  },
  {
    "id": 5,
    "title": "Quiet Studio near Park",
    "type": "apartment",
    "price": 600,
    "availablePhase": "Both",
    "location": "Oststadt",
    "address": "Lanzstraße 5",
    "images": ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop](https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop"],
    "roommate": null,
    "matchScore": 85,
    "features": ["Garden Access", "Parquet", "New Kitchen"],
    "distance": "0.8 km",
    "travelTime": "5 min",
    "size": "30m²",
    "availability": { "months": ["Oct", "Nov", "Dec"], "color": "blue" }
  },
  {
    "id": 6,
    "title": "Bright Room in WG",
    "type": "partner",
    "price": 480,
    "availablePhase": "A-Phase",
    "location": "Schwetzingerstadt",
    "address": "Seckenheimer Str. 30",
    "images": ["https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&h=600&fit=crop](https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&h=600&fit=crop"],
    "roommate": "Sarah B.",
    "matchScore": 98,
    "features": ["Renovated", "Washer", "Top Floor"],
    "distance": "1.5 km",
    "travelTime": "10 min",
    "size": "16m²",
    "availability": { "months": ["Jan", "Feb", "Mar"], "color": "green" }
  },
  {
    "id": 7,
    "title": "Industrial Style WG",
    "type": "partner",
    "price": 430,
    "availablePhase": "B-Phase",
    "location": "Neckarstadt",
    "address": "Mittelstraße 8",
    "images": ["https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800"],
    "roommate": "Kevin S.",
    "matchScore": 81,
    "features": ["Exposed Brick", "Big Kitchen", "TV"],
    "distance": "3.0 km",
    "travelTime": "14 min",
    "size": "19m²",
    "availability": { "months": ["Jul", "Aug", "Sep"], "color": "green" }
  },
  {
    "id": 8,
    "title": "Lake View Room",
    "type": "partner",
    "price": 460,
    "availablePhase": "A-Phase",
    "location": "Neckarau",
    "address": "Steubenstraße 44",
    "images": ["https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800"],
    "roommate": "Julia F.",
    "matchScore": 89,
    "features": ["Near Lake", "Desk", "Sunset view"],
    "distance": "4.5 km",
    "travelTime": "22 min",
    "size": "17m²",
    "availability": { "months": ["Oct", "Nov", "Dec"], "color": "green" }
  },
  {
    "id": 9,
    "title": "Premium Loft Central",
    "type": "apartment",
    "price": 950,
    "availablePhase": "Both",
    "location": "Quadrate",
    "address": "O2, 7",
    "images": ["https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800"],
    "roommate": null,
    "matchScore": 65,
    "features": ["Smart Home", "AC", "Luxury"],
    "distance": "2.8 km",
    "travelTime": "12 min",
    "size": "65m²",
    "availability": { "months": ["All Year"], "color": "blue" }
  },
  {
    "id": 10,
    "title": "Budget Student Room",
    "type": "partner",
    "price": 350,
    "availablePhase": "B-Phase",
    "location": "Käfertal",
    "address": "Boveristraße 21",
    "images": ["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"],
    "roommate": "Nils W.",
    "matchScore": 77,
    "features": ["Cheap", "Basement", "All-incl."],
    "distance": "5.2 km",
    "travelTime": "25 min",
    "size": "14m²",
    "availability": { "months": ["Apr", "May", "Jun"], "color": "green" }
  },
  {
    "id": 11,
    "title": "Minimalist Room Almenhof",
    "type": "partner",
    "price": 440,
    "availablePhase": "A-Phase",
    "location": "Almenhof",
    "address": "Zaystraße 2",
    "images": ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800"],
    "roommate": "Sophie H.",
    "matchScore": 94,
    "features": ["Clean", "New Furniture", "Subway"],
    "distance": "2.2 km",
    "travelTime": "10 min",
    "size": "20m²",
    "availability": { "months": ["Jan", "Feb", "Mar"], "color": "green" }
  },
  {
    "id": 12,
    "title": "Green Living Apartment",
    "type": "apartment",
    "price": 720,
    "availablePhase": "Both",
    "location": "Feudenheim",
    "address": "Hauptstraße 88",
    "images": ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"],
    "roommate": null,
    "matchScore": 72,
    "features": ["Eco-friendly", "Terrace", "Quiet"],
    "distance": "3.5 km",
    "travelTime": "15 min",
    "size": "42m²",
    "availability": { "months": ["Oct", "Nov", "Dec"], "color": "blue" }
  },
  {
    "id": 13,
    "title": "DHBW Campus WG",
    "type": "partner",
    "price": 500,
    "availablePhase": "B-Phase",
    "location": "Neuostheim",
    "address": "Coblitzallee 1",
    "images": ["https://images.unsplash.com/photo-1555854816-80dc122197db?w=800"],
    "roommate": "Erik T.",
    "matchScore": 99,
    "features": ["Next to DHBW", "Shared Balcony", "Parking"],
    "distance": "0.1 km",
    "travelTime": "1 min",
    "size": "15m²",
    "availability": { "months": ["Jul", "Aug", "Sep"], "color": "green" }
  },
  {
    "id": 14,
    "title": "Charming Attic Room",
    "type": "partner",
    "price": 390,
    "availablePhase": "A-Phase",
    "location": "Wohlgelegen",
    "address": "Klinikumstraße 4",
    "images": ["https://images.unsplash.com/photo-1499916078039-922301b0eb9b?w=800"],
    "roommate": "Mia P.",
    "matchScore": 86,
    "features": ["Skylight", "Quiet", "Student Area"],
    "distance": "2.9 km",
    "travelTime": "13 min",
    "size": "16m²",
    "availability": { "months": ["Jan", "Feb", "Mar"], "color": "green" }
  },
  {
    "id": 15,
    "title": "Spacious Loft Quadrate",
    "type": "apartment",
    "price": 890,
    "availablePhase": "Both",
    "location": "Quadrate",
    "address": "L1, 10",
    "images": ["https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=800"],
    "roommate": null,
    "matchScore": 74,
    "features": ["High Speed Net", "Modern", "Bathtub"],
    "distance": "2.6 km",
    "travelTime": "11 min",
    "size": "50m²",
    "availability": { "months": ["All Year"], "color": "blue" }
  }

  ];

  const locationsList = ['Lindenhof', 'Neckarstadt', 'Jungbusch', 'Quadrate', 'Schwetzingerstadt'];
  const featuresList = ['Furnished', 'WiFi', 'Kitchen', 'Balcony', 'Dishwasher', 'Tram'];

  const toggleLocation = (location: string) => {
    setSelectedLocations(prev =>
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    );
  };

  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature) ? prev.filter(f => f !== feature) : [...prev, feature]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedLocations([]);
    setSelectedFeatures([]);
    setSizeRange([0, 100]);
    setMatchScoreMin(0);
  };

  const filteredListings = listings.filter(l => {
    // Type filter
    if (filterType === 'partner' && l.type !== 'partner') return false;
    if (filterType === 'apartment' && l.type !== 'apartment') return false;

    // Phase filter
    if (filterPhase !== 'all' && l.availablePhase !== filterPhase && l.availablePhase !== 'Both') return false;

    // Price filter
    if (l.price < priceRange[0] || l.price > priceRange[1]) return false;

    // Location filter
    if (selectedLocations.length > 0 && !selectedLocations.includes(l.location)) return false;

    // Features filter
    if (selectedFeatures.length > 0) {
      const hasAllFeatures = selectedFeatures.every(feature => l.features.includes(feature));
      if (!hasAllFeatures) return false;
    }

    // Size filter
    const size = parseInt(l.size);
    if (size < sizeRange[0] || size > sizeRange[1]) return false;

    // Match score filter
    if (l.matchScore < matchScoreMin) return false;

    return true;
  });

  const activeFilterCount =
    (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0) +
    selectedLocations.length +
    selectedFeatures.length +
    (sizeRange[0] !== 0 || sizeRange[1] !== 100 ? 1 : 0) +
    (matchScoreMin > 0 ? 1 : 0);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 lg:px-8 pt-12 lg:pt-8 pb-4 bg-white border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl lg:text-3xl text-foreground">Phase-Share</h2>
            <p className="text-sm text-muted-foreground">
              {activeFilterCount > 0
                ? `${filteredListings.length} Ergebnisse mit ${activeFilterCount} Filter${activeFilterCount > 1 ? 'n' : ''}`
                : 'Smart Housing Match'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/housing/create')}
              className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
            >
              <Plus className="w-6 h-6" />
            </button>
            <button
              onClick={() => setShowFilters(true)}
              className="relative w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Filter className="w-5 h-5 text-foreground" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Your Phase Info */}
        <div className="bg-primary/10 border border-primary/20 rounded-xl px-4 py-3 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Your Current Phase</p>
              <p className="font-medium text-foreground">{userProfile.phase}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-1">Looking for</p>
              <p className="font-medium text-primary">{filterPhase} Partner</p>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setView('list')}
            className={`flex-1 px-4 py-2 rounded-xl transition-colors flex items-center justify-center gap-2 ${
              view === 'list' ? 'bg-primary text-white' : 'bg-secondary text-foreground'
            }`}
          >
            <Users className="w-4 h-4" />
            List
          </button>
          <button
            onClick={() => setView('map')}
            className={`flex-1 px-4 py-2 rounded-xl transition-colors flex items-center justify-center gap-2 ${
              view === 'map' ? 'bg-primary text-white' : 'bg-secondary text-foreground'
            }`}
          >
            <Map className="w-4 h-4" />
            Map
          </button>
        </div>

        {/* Type Filter */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              filterType === 'all' ? 'bg-foreground text-white' : 'bg-secondary text-foreground'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterType('partner')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              filterType === 'partner' ? 'bg-foreground text-white' : 'bg-secondary text-foreground'
            }`}
          >
            Phase Partner
          </button>
          <button
            onClick={() => setFilterType('apartment')}
            className={`flex-1 px-3 py-2 rounded-lg text-sm transition-colors ${
              filterType === 'apartment' ? 'bg-foreground text-white' : 'bg-secondary text-foreground'
            }`}
          >
            Full Apartment
          </button>
        </div>
      </div>

      {/* Listings */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-4">
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3 pb-4 max-w-7xl mx-auto">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-colors cursor-pointer"
              onClick={() => navigate(`/housing/${listing.id}`)}
            >
              {/* Image */}
              <div className="relative h-48 bg-muted">
                <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />

                {/* Match Score Badge */}
                {listing.type === 'partner' && (
                  <div className="absolute top-3 left-3 bg-primary text-white px-3 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    {listing.matchScore}% Match
                  </div>
                )}

                {/* Phase Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-medium text-foreground">
                  {listing.availablePhase}
                </div>

                {/* Heart Icon */}
                <button className="absolute bottom-3 right-3 w-10 h-10 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Heart className="w-5 h-5 text-foreground" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Title & Price */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground mb-1">{listing.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{listing.location}</span>
                      <span>•</span>
                      <span>{listing.size}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xl font-medium text-foreground">
                      <Euro className="w-5 h-5" />
                      {listing.price}
                    </div>
                    <p className="text-xs text-muted-foreground">per month</p>
                  </div>
                </div>

                {/* Phase Calendar Visualization */}
                <div className="mb-3">
                  <p className="text-xs text-muted-foreground mb-2">Availability Timeline</p>
                  <div className="flex gap-1">
                    {listing.availability.months.map((month, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-2 rounded-full ${
                          listing.availability.color === 'green' ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        title={month}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {listing.availability.months.slice(0, 3).map((month, i) => (
                      <span key={i} className="text-xs text-muted-foreground">{month}</span>
                    ))}
                  </div>
                </div>

                {/* Distance & Travel Time */}
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.distance} to DHBW</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{listing.travelTime} by tram</span>
                  </div>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {listing.features.map((feature, i) => (
                    <span key={i} className="px-2 py-1 bg-secondary rounded-lg text-xs text-foreground">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Roommate Info */}
                {listing.roommate && (
                  <div className="flex items-center gap-3 pt-3 border-t border-border">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white">
                      {listing.roommate[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{listing.roommate}</p>
                      <p className="text-xs text-muted-foreground">Phase partner</p>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-foreground">4.8</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">Keine Treffer gefunden</h3>
            <p className="text-sm text-muted-foreground mb-4">Passe deine Filter an oder erstelle ein Inserat</p>
            <button
              onClick={resetFilters}
              className="text-primary hover:underline text-sm font-medium"
            >
              Filter zurücksetzen
            </button>
          </div>
        )}
      </div>

      {/* Filter Sheet */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent
          side="bottom"
          className="h-[80vh] max-h-[600px] rounded-t-3xl overflow-hidden"
        >
          <div className="h-full flex flex-col px-6 py-6">
            <SheetHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <SheetTitle className="text-xl">Filter</SheetTitle>
                  <SheetDescription>
                    Finde die perfekte Wohnung mit deinen Kriterien
                  </SheetDescription>
                </div>
                {activeFilterCount > 0 && (
                  <span className="px-3 py-1 bg-primary text-white text-xs rounded-full font-medium">
                    {activeFilterCount} aktiv
                  </span>
                )}
              </div>
            </SheetHeader>

            <div className="flex-1 overflow-y-auto space-y-6 pr-2 -mr-2">
            {/* Active Filter Tags */}
            {(selectedLocations.length > 0 || selectedFeatures.length > 0) && (
              <div className="flex flex-wrap gap-2">
                {selectedLocations.map((location) => (
                  <button
                    key={location}
                    onClick={() => toggleLocation(location)}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                  >
                    <span>{location}</span>
                    <X className="w-3 h-3" />
                  </button>
                ))}
                {selectedFeatures.map((feature) => (
                  <button
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
                  >
                    <span>{feature}</span>
                    <X className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}

            {/* Price Range */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">Preis pro Monat</label>
                <span className="text-sm text-primary font-medium">
                  €{priceRange[0]} - €{priceRange[1]}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Min</label>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Max</label>
                    <input
                      type="number"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="50"
                  value={priceRange[1]}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= priceRange[0]) {
                      setPriceRange([priceRange[0], val]);
                    }
                  }}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Stadtteil</label>
              <div className="grid grid-cols-2 gap-2">
                {locationsList.map((location) => (
                  <button
                    key={location}
                    onClick={() => toggleLocation(location)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedLocations.includes(location)
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground border border-border'
                    }`}
                  >
                    {location}
                  </button>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <label className="text-sm font-medium text-foreground mb-3 block">Ausstattung</label>
              <div className="grid grid-cols-2 gap-2">
                {featuresList.map((feature) => (
                  <button
                    key={feature}
                    onClick={() => toggleFeature(feature)}
                    className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                      selectedFeatures.includes(feature)
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-foreground border border-border'
                    }`}
                  >
                    {feature}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Range */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">Größe (m²)</label>
                <span className="text-sm text-primary font-medium">
                  {sizeRange[0]}m² - {sizeRange[1]}m²
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Min</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="5"
                      value={sizeRange[0]}
                      onChange={(e) => setSizeRange([parseInt(e.target.value) || 0, sizeRange[1]])}
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-xs text-muted-foreground mb-1 block">Max</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      step="5"
                      value={sizeRange[1]}
                      onChange={(e) => setSizeRange([sizeRange[0], parseInt(e.target.value) || 100])}
                      className="w-full px-3 py-2 bg-input-background border border-border rounded-lg text-sm"
                    />
                  </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={sizeRange[1]}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    if (val >= sizeRange[0]) {
                      setSizeRange([sizeRange[0], val]);
                    }
                  }}
                  className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>

            {/* Match Score */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">Mindest Match Score</label>
                <span className="text-sm text-primary font-medium">{matchScoreMin}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={matchScoreMin}
                onChange={(e) => setMatchScoreMin(parseInt(e.target.value))}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

              {/* Active Filters Summary */}
              {activeFilterCount > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-blue-900">
                      {activeFilterCount} aktive Filter
                    </p>
                    <button
                      onClick={resetFilters}
                      className="text-sm text-blue-700 hover:text-blue-900 font-medium"
                    >
                      Alle zurücksetzen
                    </button>
                  </div>
                  <p className="text-xs text-blue-700">
                    {filteredListings.length} Ergebnisse gefunden
                  </p>
                </div>
              )}
            </div>

            {/* Fixed Bottom Actions */}
            <div className="pt-4 pb-2 border-t border-border mt-4">
              <div className="flex gap-3">
                <button
                  onClick={resetFilters}
                  className="flex-1 px-4 py-3 bg-secondary text-foreground rounded-xl hover:bg-muted transition-colors font-medium"
                >
                  Zurücksetzen
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className="flex-1 px-4 py-3 bg-primary text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                >
                  {filteredListings.length} Ergebnis{filteredListings.length !== 1 ? 'se' : ''} anzeigen
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
