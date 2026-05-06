import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter, Plus, Euro, MapPin, Clock, Heart, Sparkles } from 'lucide-react';

type ListingCategory = 'SERVICE' | 'PHYSICAL' | 'DIGITAL';

interface Listing {
  id: number;
  title: string;
  price: number;
  category: ListingCategory;
  subcategory: string;
  seller: string;
  location: string;
  image: string;
  condition?: string;
  postedTime: string;
  description: string;
  isDigital?: boolean;
}

export function MarketplaceView() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<'all' | ListingCategory>('all');
  const [listings, setListings] = useState<Listing[]>([]);

  // Mock data - will be replaced with Supabase query
  useEffect(() => {
    const mockListings: Listing[] = [
      {
        id: 1,
        title: 'BWL Skript - Komplette Zusammenfassung',
        price: 15,
        category: 'DIGITAL',
        subcategory: 'Study Materials',
        seller: 'Lisa M.',
        location: 'Mannheim',
        image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop',
        postedTime: '2h ago',
        description: 'Complete BWL summary for exam preparation',
        isDigital: true
      },
      {
        id: 2,
        title: 'Tutoring: Mathematik 1',
        price: 25,
        category: 'SERVICE',
        subcategory: 'Tutoring',
        seller: 'Tom K.',
        location: 'Online/Campus',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=300&fit=crop',
        postedTime: '5h ago',
        description: 'Experienced tutor for Math 1 - All semesters'
      },
      {
        id: 3,
        title: 'IKEA Desk & Chair Set',
        price: 80,
        category: 'PHYSICAL',
        subcategory: 'Furniture',
        seller: 'Anna S.',
        location: 'Lindenhof',
        image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop',
        condition: 'Good',
        postedTime: '1d ago',
        description: 'Perfect student desk setup'
      },
      {
        id: 4,
        title: 'Programmieren Nachhilfe',
        price: 30,
        category: 'SERVICE',
        subcategory: 'Tutoring',
        seller: 'Max K.',
        location: 'Neckarstadt',
        image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
        postedTime: '1d ago',
        description: 'Java, Python, Web Development'
      },
      {
        id: 5,
        title: 'Informatik Altklausuren (PDF)',
        price: 10,
        category: 'DIGITAL',
        subcategory: 'Exam Prep',
        seller: 'Felix W.',
        location: 'Digital',
        image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
        postedTime: '2d ago',
        description: 'Past exams with solutions',
        isDigital: true
      },
      {
        id: 6,
        title: 'City Bike - 21 Speed',
        price: 120,
        category: 'PHYSICAL',
        subcategory: 'Bikes',
        seller: 'Sarah L.',
        location: 'Jungbusch',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&h=300&fit=crop',
        condition: 'Like New',
        postedTime: '3d ago',
        description: 'Perfect condition with lock'
      }
    ];

    setListings(mockListings);
  }, []);

  const categories = [
    { id: 'all' as const, label: 'All', color: 'bg-foreground', textColor: 'text-white' },
    { id: 'SERVICE' as const, label: 'Services', color: 'bg-blue-500', textColor: 'text-white', emoji: '🎓' },
    { id: 'PHYSICAL' as const, label: 'Physical', color: 'bg-orange-500', textColor: 'text-white', emoji: '📦' },
    { id: 'DIGITAL' as const, label: 'Digital', color: 'bg-purple-500', textColor: 'text-white', emoji: '💾' }
  ];

  const filteredListings = selectedCategory === 'all'
    ? listings
    : listings.filter(item => item.category === selectedCategory);

  const getCategoryColor = (category: ListingCategory) => {
    const colors = {
      SERVICE: 'border-l-blue-500 bg-blue-50',
      PHYSICAL: 'border-l-orange-500 bg-orange-50',
      DIGITAL: 'border-l-purple-500 bg-purple-50'
    };
    return colors[category];
  };

  const getCategoryBadge = (category: ListingCategory) => {
    const badges = {
      SERVICE: 'bg-blue-500 text-white',
      PHYSICAL: 'bg-orange-500 text-white',
      DIGITAL: 'bg-purple-500 text-white'
    };
    return badges[category];
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 lg:px-8 pt-12 lg:pt-8 pb-4 bg-white border-b border-border max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl lg:text-3xl text-foreground">Marketplace</h2>
            <p className="text-sm text-muted-foreground">Buy, sell & trade</p>
          </div>
          <button
            onClick={() => navigate('/marketplace/create')}
            className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search items..."
            className="w-full pl-12 pr-4 py-3 bg-input-background rounded-xl border border-border focus:border-primary outline-none transition-colors text-foreground"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? `${cat.color} ${cat.textColor}`
                  : 'bg-secondary text-foreground'
              }`}
            >
              {cat.emoji && <span>{cat.emoji}</span>}
              <span className="text-sm font-medium">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto px-6 lg:px-8 py-4">
        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3 pb-4 max-w-7xl mx-auto">
          {filteredListings.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-xl overflow-hidden border-l-4 ${getCategoryColor(item.category)} hover:shadow-md transition-all cursor-pointer`}
              onClick={() => navigate(`/marketplace/${item.id}`)}
            >
              <div className="flex gap-4 p-4">
                {/* Image */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  {item.isDigital && (
                    <div className="absolute top-1 right-1 bg-purple-500 text-white p-1 rounded">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-foreground mb-1 truncate">
                        {item.title}
                      </h3>
                      <div className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getCategoryBadge(item.category)}`}>
                        {item.category}
                      </div>
                    </div>
                    <div className="text-right ml-3">
                      <div className="flex items-center gap-1 text-lg font-medium text-foreground">
                        <Euro className="w-4 h-4" />
                        {item.price}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.postedTime}</span>
                    </div>
                  </div>

                  {item.condition && (
                    <span className="inline-block px-2 py-0.5 bg-secondary rounded text-xs text-foreground">
                      {item.condition}
                    </span>
                  )}
                </div>

                {/* Heart Icon */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center hover:bg-secondary rounded-full transition-colors"
                >
                  <Heart className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredListings.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">No items found</h3>
            <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters</p>
            <button
              onClick={() => navigate('/marketplace/create')}
              className="text-primary hover:underline text-sm font-medium"
            >
              Be the first to post!
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
