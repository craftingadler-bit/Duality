import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, MapPin, Euro, Star, MessageCircle, Heart, Share2, Calendar, Clock, TrendingUp, CheckCircle, Users, Home } from 'lucide-react';
import { useState } from 'react';

export function HousingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCompatibility, setShowCompatibility] = useState(false);

  const listings = [
    {
      id: 1,
      title: 'Cozy Room in Lindenhof',
      type: 'partner',
      price: 450,
      availablePhase: 'B-Phase',
      location: 'Lindenhof',
      address: 'Meerfeldstraße 15, 68163 Mannheim',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
      ],
      roommate: {
        name: 'Lisa M.',
        age: 21,
        major: 'Business Administration',
        semester: 3,
        phase: 'A-Phase',
        verified: true,
        rating: 4.9,
        reviews: 12
      },
      matchScore: 95,
      features: ['Furnished', 'WiFi', 'Kitchen access', 'Washing machine', 'Balcony'],
      distance: '1.2 km',
      travelTime: '8 min',
      size: '18m²',
      description: 'Beautiful room in a shared apartment with great public transport connections. Perfect for B-Phase students! The room comes fully furnished with a bed, desk, wardrobe, and shelf. Kitchen and bathroom are shared with one other student.',
      availableFrom: 'July 1, 2026',
      availableUntil: 'September 30, 2026',
      phaseCalendar: {
        yourPhase: ['Apr', 'May', 'Jun', 'Oct', 'Nov', 'Dec'],
        partnerPhase: ['Jan', 'Feb', 'Mar', 'Jul', 'Aug', 'Sep']
      }
    },
    {
      id: 2,
      title: 'Modern Apartment Share',
      type: 'partner',
      price: 520,
      availablePhase: 'A-Phase',
      location: 'Neckarstadt',
      address: 'Lange Rötterstraße 42, 68167 Mannheim',
      images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop'],
      roommate: {
        name: 'Tom K.',
        age: 23,
        major: 'Computer Science',
        semester: 5,
        phase: 'B-Phase',
        verified: true,
        rating: 4.7,
        reviews: 8
      },
      matchScore: 88,
      features: ['Balcony', 'Dishwasher', 'Close to tram', 'High-speed WiFi', 'Smart TV'],
      distance: '2.5 km',
      travelTime: '12 min',
      size: '20m²',
      description: 'Modern apartment in Neckarstadt with excellent infrastructure.',
      availableFrom: 'October 1, 2026',
      availableUntil: 'December 31, 2026',
      phaseCalendar: {
        yourPhase: ['Apr', 'May', 'Jun', 'Oct', 'Nov', 'Dec'],
        partnerPhase: ['Jan', 'Feb', 'Mar', 'Jul', 'Aug', 'Sep']
      }
    },
    {
      id: 3,
      title: 'Whole Apartment Available',
      type: 'apartment',
      price: 800,
      availablePhase: 'Both',
      location: 'Quadrate',
      address: 'M7, 24, 68161 Mannheim',
      images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'],
      roommate: null,
      matchScore: 70,
      features: ['2 Rooms', 'Balcony', 'City Center', 'Elevator', 'Parking'],
      distance: '3.1 km',
      travelTime: '15 min',
      size: '55m²',
      description: 'Spacious 2-room apartment in the heart of Mannheim.',
      availableFrom: 'Immediately',
      availableUntil: 'Long-term',
      phaseCalendar: null
    }
  ];

  const listing = listings.find(l => l.id === Number(id));

  if (!listing) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-2">Listing not found</h2>
          <button onClick={() => navigate('/housing')} className="text-primary">
            Back to Housing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/housing')}
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h2 className="text-lg truncate text-foreground">{listing.title}</h2>
          </div>
          <button className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <div className="h-80 bg-muted">
          <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
        </div>
        {listing.type === 'partner' && (
          <div className="absolute top-4 left-4 bg-primary text-white px-4 py-2 rounded-full font-medium flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            {listing.matchScore}% Match
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Price & Phase */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl text-foreground mb-2">{listing.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{listing.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{listing.distance}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{listing.travelTime} by tram</span>
              </div>
              <span>•</span>
              <span>{listing.size}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-3xl font-medium text-foreground mb-1">
              <Euro className="w-6 h-6" />
              {listing.price}
            </div>
            <p className="text-xs text-muted-foreground mb-2">per month</p>
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
              {listing.availablePhase}
            </div>
          </div>
        </div>

        {/* Phase Compatibility Check */}
        {listing.phaseCalendar && (
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-5 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-foreground flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Phase Compatibility
              </h3>
              <button
                onClick={() => setShowCompatibility(!showCompatibility)}
                className="text-sm text-primary hover:underline"
              >
                {showCompatibility ? 'Hide' : 'Show'} Details
              </button>
            </div>

            {showCompatibility && (
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Your Phases (at DHBW)</p>
                  <div className="flex gap-1 flex-wrap">
                    {listing.phaseCalendar.yourPhase.map((month, i) => (
                      <div key={i} className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                        {month}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Partner's Phases (needs room)</p>
                  <div className="flex gap-1 flex-wrap">
                    {listing.phaseCalendar.partnerPhase.map((month, i) => (
                      <div key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                        {month}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-lg p-3 mt-3">
                  <p className="text-sm text-foreground">
                    ✅ Perfect Match! Your phases don't overlap - you can share this room throughout the year.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Availability */}
        <div className="bg-secondary rounded-xl p-4 mb-6">
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-1">Available Period</p>
              <p className="text-sm text-muted-foreground">
                {listing.availableFrom} - {listing.availableUntil}
              </p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-medium text-foreground mb-3">About this room</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{listing.description}</p>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="font-medium text-foreground mb-3">Features</h3>
          <div className="grid grid-cols-2 gap-3">
            {listing.features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2 px-3 py-2 bg-secondary rounded-xl">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Roommate/Partner Profile */}
        {listing.roommate && (
          <div className="mb-6">
            <h3 className="font-medium text-foreground mb-3">Your Phase Partner</h3>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                  {listing.roommate.name[0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-foreground">{listing.roommate.name}</h4>
                    {listing.roommate.verified && (
                      <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {listing.roommate.age} years • {listing.roommate.major} • {listing.roommate.semester}. Semester
                  </p>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium text-foreground">{listing.roommate.rating}</span>
                    <span className="text-sm text-muted-foreground">({listing.roommate.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="bg-secondary rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-1">Current Phase</p>
                <p className="text-sm font-medium text-foreground">{listing.roommate.phase}</p>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions (floating at bottom) */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 max-w-md mx-auto">
          <div className="flex gap-3">
            <button className="w-12 h-12 border-2 border-primary rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors">
              <Heart className="w-5 h-5 text-primary" />
            </button>
            <button className="flex-1 bg-primary text-white py-3 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              {listing.roommate ? 'Contact Partner' : 'Contact Landlord'}
            </button>
          </div>
        </div>

        {/* Spacer */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
