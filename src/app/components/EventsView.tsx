import { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router';
import { Heart, X, MapPin, Users, Calendar, Plus, Filter } from 'lucide-react';
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
  
  // --- NEU: Filter State ---
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const categories = ['Alle', 'Sports', 'Gaming', 'Party', 'Art', 'Study', 'Food'];

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await eventsAPI.getAll();
      if (error) {
        console.error('Error loading events:', error);
        setEvents([]);
      } else if (data) {
        setEvents(data);
      }
    } catch (error) {
      console.error('Error loading events:', error);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  // --- NEU: Filter Logik ---
  const filteredEvents = selectedCategory === 'Alle' 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  const currentEvent = filteredEvents[currentIndex];

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (!currentEvent) return;
    
    setSwipeDirection(direction);

    if (direction === 'right' && currentEvent.id) {
      try {
        await eventsAPI.join(currentEvent.id);
      } catch (error) {
        console.error('Error joining event:', error);
      }
    }

    setTimeout(() => {
      if (currentIndex < filteredEvents.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
      setSwipeDirection(null);
    }, 300);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', { 
      weekday: 'short', 
      day: '2-digit', 
      month: '2-digit', 
      hour: '2-digit', 
      minute: '2-digit' 
    }) + " Uhr";
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Lade Campus Events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header mit Filter */}
      <div className="px-6 lg:px-8 pt-12 lg:pt-8 pb-4 bg-card border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Events</h2>
            <p className="text-sm text-muted-foreground">Entdecke Mannheim</p>
          </div>
          <button
            onClick={() => navigate('/events/create')}
            className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>

        {/* --- NEU: Horizontale Filter-Leiste --- */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentIndex(0); // Reset Swipe-Index bei Filterwechsel
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-secondary text-muted-foreground hover:bg-muted'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      {filteredEvents.length === 0 ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground">Keine Events in dieser Kategorie gefunden.</p>
            <button 
              onClick={() => setSelectedCategory('Alle')}
              className="text-primary mt-2 font-medium"
            >
              Alle anzeigen
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Mobile Swipe Card */}
          <div className="lg:hidden flex-1 flex flex-col items-center justify-center p-6 gap-6">
            <div
              onClick={() => navigate(`/events/${currentEvent.id}`)} // --- NEU: Klick für Details ---
              className={`w-full max-w-sm bg-card rounded-3xl overflow-hidden shadow-2xl border border-border cursor-pointer active:scale-[0.98] transition-all duration-300 ${
                swipeDirection === 'left' ? '-translate-x-full opacity-0 rotate-12' :
                swipeDirection === 'right' ? 'translate-x-full opacity-0 -rotate-12' : ''
              }`}
            >
              <div className="relative h-80 bg-muted">
                <img
                  src={currentEvent.image_url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800'}
                  alt={currentEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {currentEvent.category}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h3 className="text-2xl font-bold mb-1">{currentEvent.title}</h3>
                  <p className="text-white/80 text-sm flex items-center gap-1">
                    <MapPin size={14} /> {currentEvent.location}
                  </p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm mb-4 text-foreground/80 line-clamp-2">{currentEvent.description}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{formatDate(currentEvent.event_date)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{currentEvent.attendees || 0} / {currentEvent.max_attendees} Teilnehmer</span>
                  </div>
                </div>
                <p className="mt-4 text-xs text-primary font-bold text-center uppercase tracking-wider">Tippen für Details</p>
              </div>
            </div>

            {/* Mobile Buttons */}
            <div className="flex items-center justify-center gap-6">
              <button onClick={(e) => { e.stopPropagation(); handleSwipe('left'); }} className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-border active:scale-90 transition-transform">
                <X className="w-7 h-7 text-foreground" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleSwipe('right'); }} className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border border-border active:scale-90 transition-transform">
                <Heart className="w-7 h-7 text-green-500 fill-green-500" />
              </button>
            </div>
          </div>

          {/* Desktop Grid View */}
          <div className="hidden lg:block flex-1 overflow-y-auto p-8">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  onClick={() => navigate(`/events/${event.id}`)}
                  className="bg-card rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.image_url || 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800'} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-md text-xs">
                      {event.category}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin size={14} />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-primary font-medium">
                        <Calendar size={14} />
                        <span>{formatDate(event.event_date)}</span>
                      </div>
                      <div className="text-muted-foreground font-medium">
                        {event.attendees || 0}/{event.max_attendees} Plätze
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}