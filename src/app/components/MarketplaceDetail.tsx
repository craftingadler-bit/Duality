import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Euro, MapPin, Clock, MessageCircle, Heart, Share2, Star, User, Shield, Calendar } from 'lucide-react';
import { useState } from 'react';

type ListingCategory = 'SERVICE' | 'PHYSICAL' | 'DIGITAL';

export function MarketplaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - will be replaced with Supabase query
  const listings = [
    {
      id: 1,
      title: 'BWL Skript - Komplette Zusammenfassung',
      price: 15,
      category: 'DIGITAL' as ListingCategory,
      subcategory: 'Study Materials',
      seller: {
        name: 'Lisa M.',
        rating: 4.9,
        reviews: 12,
        verified: true,
        major: 'Business Administration',
        semester: 3
      },
      location: 'Mannheim',
      images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&h=600&fit=crop'],
      postedTime: '2h ago',
      description: 'Complete BWL summary for exam preparation. Includes all topics from semester 1-3. Perfect for quick revision before exams. Digital PDF format with bookmarks and highlighting.',
      isDigital: true,
      fileSize: '2.5 MB',
      fileType: 'PDF'
    },
    {
      id: 2,
      title: 'Tutoring: Mathematik 1',
      price: 25,
      category: 'SERVICE' as ListingCategory,
      subcategory: 'Tutoring',
      seller: {
        name: 'Tom K.',
        rating: 4.8,
        reviews: 15,
        verified: true,
        major: 'Computer Science',
        semester: 5
      },
      location: 'Online/Campus',
      images: ['https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&h=300&fit=crop'],
      postedTime: '5h ago',
      description: 'Experienced tutor for Math 1. All semesters welcome. Online or on campus. Flexible scheduling.',
      hourlyRate: 25,
      duration: 60
    },
    {
      id: 3,
      title: 'IKEA Desk & Chair Set',
      price: 80,
      category: 'PHYSICAL' as ListingCategory,
      subcategory: 'Furniture',
      seller: {
        name: 'Anna S.',
        rating: 5.0,
        reviews: 8,
        verified: true,
        major: 'International Business',
        semester: 2
      },
      location: 'Lindenhof',
      images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&h=300&fit=crop'],
      condition: 'Good',
      postedTime: '1d ago',
      description: 'Perfect student desk setup. Moving out sale. Desk 120x60cm, adjustable chair. Pick up only.'
    },
    {
      id: 4,
      title: 'Programmieren Nachhilfe',
      price: 30,
      category: 'SERVICE' as ListingCategory,
      subcategory: 'Tutoring',
      seller: {
        name: 'Max K.',
        rating: 4.7,
        reviews: 10,
        verified: true,
        major: 'Computer Science',
        semester: 6
      },
      location: 'Neckarstadt',
      images: ['https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=300&fit=crop'],
      postedTime: '1d ago',
      description: 'Java, Python, Web Development tutoring',
      hourlyRate: 30,
      duration: 90
    },
    {
      id: 5,
      title: 'Informatik Altklausuren (PDF)',
      price: 10,
      category: 'DIGITAL' as ListingCategory,
      subcategory: 'Exam Prep',
      seller: {
        name: 'Felix W.',
        rating: 4.6,
        reviews: 7,
        verified: true,
        major: 'Computer Science',
        semester: 4
      },
      location: 'Digital',
      images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&h=300&fit=crop'],
      postedTime: '2d ago',
      description: 'Past exams with solutions from the last 3 years',
      isDigital: true,
      fileSize: '1.8 MB',
      fileType: 'PDF'
    },
    {
      id: 6,
      title: 'City Bike - 21 Speed',
      price: 120,
      category: 'PHYSICAL' as ListingCategory,
      subcategory: 'Bikes',
      seller: {
        name: 'Sarah L.',
        rating: 4.9,
        reviews: 11,
        verified: true,
        major: 'Mechanical Engineering',
        semester: 3
      },
      location: 'Jungbusch',
      images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&h=300&fit=crop'],
      condition: 'Like New',
      postedTime: '3d ago',
      description: 'Perfect condition city bike with lock included. 21-speed Shimano gears.'
    }
  ];

  const listing = listings.find(l => l.id === Number(id));

  if (!listing) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl text-foreground mb-2">Listing not found</h2>
          <button onClick={() => navigate('/marketplace')} className="text-primary hover:underline">
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: ListingCategory) => {
    const colors = {
      SERVICE: 'bg-blue-500 text-white',
      PHYSICAL: 'bg-orange-500 text-white',
      DIGITAL: 'bg-purple-500 text-white'
    };
    return colors[category];
  };

  return (
    <div className="h-full overflow-y-auto bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/marketplace')}
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

      {/* Image */}
      <div className="relative h-80 bg-muted">
        <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium ${getCategoryColor(listing.category)}`}>
          {listing.category}
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">
        {/* Price & Title */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <h1 className="text-2xl text-foreground mb-2">{listing.title}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{listing.location}</span>
              <span>•</span>
              <Clock className="w-4 h-4" />
              <span>{listing.postedTime}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-3xl font-medium text-foreground">
              <Euro className="w-6 h-6" />
              {listing.price}
            </div>
            {listing.hourlyRate && (
              <p className="text-xs text-muted-foreground">per hour</p>
            )}
          </div>
        </div>

        {/* Digital Asset Info */}
        {listing.isDigital && (
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground mb-1">Digital Asset - Secure Download</p>
                <p className="text-xs text-muted-foreground mb-2">
                  File will be available after payment confirmation
                </p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span>📄 {listing.fileType}</span>
                  <span>•</span>
                  <span>💾 {listing.fileSize}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Service Details */}
        {listing.category === 'SERVICE' && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Hourly Rate</p>
                <p className="text-lg font-medium text-foreground flex items-center gap-1">
                  <Euro className="w-4 h-4" />
                  {listing.hourlyRate}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Session Duration</p>
                <p className="text-lg font-medium text-foreground flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {listing.duration} min
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Physical Item Details */}
        {listing.condition && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground mb-2">Condition</p>
            <span className="inline-block px-3 py-1.5 bg-secondary rounded-lg text-sm text-foreground">
              {listing.condition}
            </span>
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h3 className="font-medium text-foreground mb-3">Description</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{listing.description}</p>
        </div>

        {/* Seller Info */}
        <div className="mb-6">
          <h3 className="font-medium text-foreground mb-3">Seller</h3>
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl flex-shrink-0">
                {listing.seller.name[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-foreground">{listing.seller.name}</h4>
                  {listing.seller.verified && (
                    <div className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Verified
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  {listing.seller.major} • {listing.seller.semester}. Semester
                </p>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-foreground">{listing.seller.rating}</span>
                  <span className="text-sm text-muted-foreground">({listing.seller.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 max-w-md mx-auto">
          <div className="flex gap-3">
            <button className="w-12 h-12 border-2 border-primary rounded-xl flex items-center justify-center hover:bg-primary/10 transition-colors">
              <Heart className="w-5 h-5 text-primary" />
            </button>
            <button className="flex-1 bg-primary text-white py-3 rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Contact Seller
            </button>
          </div>
        </div>

        {/* Spacer for fixed button */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}
