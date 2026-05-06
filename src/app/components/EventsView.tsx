import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { Heart, X, MapPin, Users, Calendar, Clock, Sparkles, Plus } from 'lucide-react';
import { eventsAPI } from '../../lib/api';

interface UserProfile {
  name: string;
  major: string;
  phase: string;
  interests: string[];
}

interface OutletContext {
  userProfile: UserProfile;
}

export function EventsView() {
  const { userProfile } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load events from Supabase
  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await eventsAPI.getAll();

      if (error) {
        console.error('Error loading events:', error);
        // Fall back to mock data if error
        setEvents(mockEvents);
      } else if (data && data.length > 0) {
        // Use real data from Supabase
        setEvents(data);
      } else {
        // No events yet, use mock data
        setEvents(mockEvents);
      }
    } catch (error) {
      console.error('Error loading events:', error);
      setEvents(mockEvents);
    } finally {
      setIsLoading(false);
    }
  };

  const mockEvents = [
    {
      id: 1,
      title: 'Volleyball at Neckarwiese',
      category: 'Sports',
      host: 'Max & Friends',
      date: 'Tomorrow, 18:00',
      location: 'Neckarwiese',
      attendees: 8,
      maxAttendees: 12,
      image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=800&h=600&fit=crop',
      description: 'Casual volleyball game, all levels welcome!',
      tags: ['Outdoor', 'Free', 'Beginner friendly'],
      sponsored: false
    },
    {
      id: 2,
      title: 'Gaming Night @ Campus',
      category: 'Gaming',
      host: 'DHBW Esports Club',
      date: 'Friday, 20:00',
      location: 'Campus Building A',
      attendees: 15,
      maxAttendees: 20,
      image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
      description: 'Mario Kart tournament + casual gaming',
      tags: ['Indoor', 'Free', 'Pizza included'],
      sponsored: true
    },
    {
      id: 3,
      title: 'Ceramic Painting Workshop',
      category: 'Art',
      host: 'Creative Minds MA',
      date: 'Saturday, 14:00',
      location: 'Kunsthalle Mannheim',
      attendees: 5,
      maxAttendees: 10,
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=600&fit=crop',
      description: 'Create your own ceramic masterpiece!',
      tags: ['Creative', '€15', 'Materials included'],
      sponsored: true
    },
    {
      id: 4,
      title: 'Pub Crawl Mannheim',
      category: 'Party',
      host: 'Social Squad',
      date: 'Saturday, 21:00',
      location: 'Starting at Jungbusch',
      attendees: 24,
      maxAttendees: 30,
      image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?w=800&h=600&fit=crop',
      description: '5 bars, special student deals, new friends!',
      tags: ['Nightlife', '€10 entry', '21+'],
      sponsored: false
    }
  ];

  const currentEvent = events[currentIndex];

  const handleSwipe = async (direction: 'left' | 'right') => {
    setSwipeDirection(direction);

    // If swiped right (join event) and event has an ID
    if (direction === 'right' && currentEvent.id) {
      try {
        await eventsAPI.join(currentEvent.id);
        console.log('Joined event:', currentEvent.id);
      } catch (error) {
        console.error('Error joining event:', error);
      }
    }

    setTimeout(() => {
      if (currentIndex < events.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setSwipeDirection(null);
    }, 300);
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Lade Events...</p>
        </div>
      </div>
    );
  }

  if (!currentEvent) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center px-6">
          <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">Noch keine Events</h3>
          <p className="text-sm text-muted-foreground mb-4">Sei der Erste und erstelle ein Event!</p>
          <button
            onClick={() => navigate('/events/create')}
            className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors"
          >
            Event erstellen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 lg:px-8 pt-12 lg:pt-8 pb-4 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl lg:text-3xl mb-1">Events</h2>
          <button
            onClick={() => navigate('/events/create')}
            className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground lg:hidden">Swipe right to join, left to skip</p>
        <p className="text-sm text-muted-foreground hidden lg:block">Entdecke Events in deiner Nähe</p>
      </div>

      {/* Mobile: Swipe Card View */}
      <div className="lg:hidden flex-1 flex items-center justify-center p-6">
        <div
          className={`w-full max-w-sm bg-card rounded-3xl overflow-hidden shadow-2xl border-2 border-border transition-all duration-300 ${
            swipeDirection === 'left' ? '-translate-x-full opacity-0 rotate-12' :
            swipeDirection === 'right' ? 'translate-x-full opacity-0 -rotate-12' : ''
          }`}
        >
          {/* Image */}
          <div className="relative h-80 bg-muted">
            <img
              src={currentEvent.image}
              alt={currentEvent.title}
              className="w-full h-full object-cover"
            />
            {currentEvent.sponsored && (
              <div className="absolute top-4 right-4 bg-accent text-foreground px-3 py-1 rounded-full text-sm flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Sponsored
              </div>
            )}
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
              {currentEvent.category}
            </div>

            {/* Gradient Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>

            {/* Title on Image */}
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <h3 className="text-2xl mb-1">{currentEvent.title}</h3>
              <p className="text-white/80 text-sm">by {currentEvent.host}</p>
            </div>
          </div>

          {/* Details */}
          <div className="p-6">
            <p className="text-sm mb-4 text-foreground/80">{currentEvent.description}</p>

            {/* Info Grid */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="w-4 h-4 text-primary" />
                <span>{currentEvent.date}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{currentEvent.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span>{currentEvent.attendees}/{currentEvent.maxAttendees} going</span>
                <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(currentEvent.attendees / currentEvent.maxAttendees) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {currentEvent.tags.map((tag, i) => (
                <span key={i} className="px-3 py-1 bg-secondary rounded-full text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Swipe Buttons - Mobile Only */}
      <div className="lg:hidden px-6 pb-8 flex items-center justify-center gap-6">
        <button
          onClick={() => handleSwipe('left')}
          className="w-16 h-16 bg-red-50 border-2 border-red-200 rounded-full flex items-center justify-center hover:bg-red-100 transition-colors"
        >
          <X className="w-7 h-7 text-red-500" />
        </button>
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {currentIndex + 1} of {events.length}
          </p>
        </div>
        <button
          onClick={() => handleSwipe('right')}
          className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center hover:bg-green-100 transition-colors"
        >
          <Heart className="w-7 h-7 text-green-500" />
        </button>
      </div>

      {/* Desktop: Grid View */}
      <div className="hidden lg:block flex-1 overflow-y-auto p-8">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Lade Events...</p>
            </div>
          </div>
        ) : events.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center px-6">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Noch keine Events</h3>
              <p className="text-sm text-muted-foreground mb-4">Sei der Erste und erstelle ein Event!</p>
              <button
                onClick={() => navigate('/events/create')}
                className="bg-primary text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors"
              >
                Event erstellen
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {events.map((event) => (
            <div
              key={event.id}
              onClick={() => navigate(`/events/${event.id}`)}
              className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all cursor-pointer hover:scale-[1.02]"
            >
              {/* Image */}
              <div className="relative h-48 bg-muted">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {event.sponsored && (
                  <div className="absolute top-3 right-3 bg-accent text-foreground px-2 py-1 rounded-full text-xs flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Sponsored
                  </div>
                )}
                <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs">
                  {event.category}
                </div>
              </div>

              {/* Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-1">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">by {event.host}</p>
                <p className="text-sm mb-3 text-foreground/80 line-clamp-2">{event.description}</p>

                {/* Info */}
                <div className="space-y-2 mb-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-muted-foreground">{event.attendees}/{event.maxAttendees} going</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {event.tags.map((tag, i) => (
                    <span key={i} className="px-2 py-1 bg-secondary rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
