import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { X, MapPin, Calendar, Users, ArrowLeft, Navigation as NavigationIcon } from 'lucide-react';
import { motion } from 'motion/react';

// Dynamic imports for Leaflet to avoid SSR issues
let MapContainer: any;
let TileLayer: any;
let Marker: any;
let Popup: any;
let useMap: any;
let L: any;

const loadLeaflet = async () => {
  if (typeof window !== 'undefined') {
    const leaflet = await import('leaflet');
    const reactLeaflet = await import('react-leaflet');
    
    L = leaflet.default;
    MapContainer = reactLeaflet.MapContainer;
    TileLayer = reactLeaflet.TileLayer;
    Marker = reactLeaflet.Marker;
    Popup = reactLeaflet.Popup;
    useMap = reactLeaflet.useMap;
    
    // Fix for default marker icons
    const icon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    L.Marker.prototype.options.icon = icon;
  }
};

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  lat: number;
  lng: number;
  sponsored: boolean;
}

// Mannheim-basierte Events mit echten Koordinaten
const mannheimEvents: Event[] = [
  {
    id: 1,
    title: 'Volleyball at Neckarwiese',
    category: 'Sports',
    date: 'Tomorrow, 18:00',
    location: 'Neckarwiese',
    attendees: 8,
    maxAttendees: 12,
    lat: 49.4925,
    lng: 8.4807,
    sponsored: false
  },
  {
    id: 2,
    title: 'Gaming Night @ Campus',
    category: 'Gaming',
    date: 'Friday, 20:00',
    location: 'DHBW Campus',
    attendees: 15,
    maxAttendees: 20,
    lat: 49.4745,
    lng: 8.5265,
    sponsored: true
  },
  {
    id: 3,
    title: 'Ceramic Painting Workshop',
    category: 'Art',
    date: 'Saturday, 14:00',
    location: 'Kunsthalle Mannheim',
    attendees: 5,
    maxAttendees: 10,
    lat: 49.4805,
    lng: 8.4645,
    sponsored: true
  },
  {
    id: 4,
    title: 'Pub Crawl Mannheim',
    category: 'Party',
    date: 'Saturday, 21:00',
    location: 'Jungbusch',
    attendees: 24,
    maxAttendees: 30,
    lat: 49.4895,
    lng: 8.4705,
    sponsored: false
  },
  {
    id: 5,
    title: 'Study Group - Analysis II',
    category: 'Study',
    date: 'Sunday, 15:00',
    location: 'Stadtbibliothek',
    attendees: 6,
    maxAttendees: 8,
    lat: 49.4885,
    lng: 8.4665,
    sponsored: false
  },
  {
    id: 6,
    title: 'Coffee & Code',
    category: 'Tech',
    date: 'Monday, 16:00',
    location: 'Café Flo',
    attendees: 4,
    maxAttendees: 6,
    lat: 49.4835,
    lng: 8.4725,
    sponsored: false
  }
];

// Custom marker creator based on category
const createCustomIcon = (category: string, sponsored: boolean) => {
  const colors: Record<string, string> = {
    'Sports': '#ef4444',
    'Gaming': '#8b5cf6',
    'Art': '#f59e0b',
    'Party': '#ec4899',
    'Study': '#3b82f6',
    'Tech': '#10b981'
  };
  
  const color = colors[category] || '#6b7280';
  const borderColor = sponsored ? '#E10600' : '#ffffff';
  
  return L.divIcon({
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background-color: ${color};
        border: 3px solid ${borderColor};
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: 50%;
          transform: rotate(45deg);
        "></div>
      </div>
    `,
    className: 'custom-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });
};

// Component to recenter map
function RecenterMap({ lat, lng }: { lat: number; lng: number }) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([lat, lng], map.getZoom());
  }, [lat, lng, map]);
  
  return null;
}

export function MapView() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  
  // Mannheim center coordinates
  const mannheimCenter: [number, number] = [49.4875, 8.4660];
  
  const categories = ['all', 'Sports', 'Gaming', 'Art', 'Party', 'Study', 'Tech'];
  
  const filteredEvents = filterCategory === 'all'
    ? mannheimEvents
    : mannheimEvents.filter(e => e.category === filterCategory);

  useEffect(() => {
    loadLeaflet().then(() => {
      setIsMapLoaded(true);
    });
  }, []);

  if (!isMapLoaded) {
    return (
      <div className="h-full relative bg-white flex items-center justify-center">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-muted-foreground">Karte wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full relative bg-white">
      {/* Header with Back Button */}
      <div className="absolute top-0 left-0 right-0 z-[1000] bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm">
        <div className="px-6 pt-12 pb-4 flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center border border-zinc-200"
          >
            <ArrowLeft className="w-5 h-5 text-zinc-700" />
          </motion.button>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">Mannheim Events</h2>
            <p className="text-sm text-muted-foreground">{filteredEvents.length} Events auf der Karte</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="px-6 pb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilterCategory(cat)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all text-sm font-medium ${
                  filterCategory === cat
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {cat === 'all' ? 'Alle' : cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="h-full w-full pt-[140px]">
        <MapContainer
          center={mannheimCenter}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {filteredEvents.map((event) => (
            <Marker
              key={event.id}
              position={[event.lat, event.lng]}
              icon={createCustomIcon(event.category, event.sponsored)}
              eventHandlers={{
                click: () => setSelectedEvent(event)
              }}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-foreground mb-1">{event.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <Calendar className="w-3 h-3" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-1">
                    <MapPin className="w-3 h-3" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-3 h-3" />
                    {event.attendees}/{event.maxAttendees} Teilnehmer
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
          
          {selectedEvent && (
            <RecenterMap lat={selectedEvent.lat} lng={selectedEvent.lng} />
          )}
        </MapContainer>
      </div>

      {/* Floating Location Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          // Could implement geolocation here
          console.log('Center on user location');
        }}
        className="absolute bottom-32 right-6 z-[1000] w-12 h-12 bg-white rounded-full shadow-xl border border-zinc-200 flex items-center justify-center"
      >
        <NavigationIcon className="w-5 h-5 text-zinc-700" />
      </motion.button>

      {/* Event Detail Bottom Sheet */}
      {selectedEvent && (
        <motion.div
          initial={{ y: 500 }}
          animate={{ y: 0 }}
          exit={{ y: 500 }}
          transition={{ type: 'spring', damping: 30 }}
          className="absolute bottom-0 left-0 right-0 z-[1000] bg-white rounded-t-3xl shadow-2xl border-t border-zinc-200"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedEvent.sponsored
                      ? 'bg-primary/10 text-primary border border-primary/20'
                      : 'bg-zinc-100 text-zinc-700'
                  }`}>
                    {selectedEvent.category}
                  </span>
                  {selectedEvent.sponsored && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                      ⭐ Gesponsert
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{selectedEvent.title}</h3>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setSelectedEvent(null)}
                className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4 text-zinc-700" />
              </motion.button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Calendar className="w-5 h-5" />
                <span>{selectedEvent.date}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{selectedEvent.location}</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Users className="w-5 h-5" />
                <span>{selectedEvent.attendees}/{selectedEvent.maxAttendees} Teilnehmer</span>
              </div>
            </div>

            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/events/${selectedEvent.id}`)}
                className="flex-1 bg-primary text-white py-3 rounded-full font-medium shadow-lg shadow-primary/30"
              >
                Event Details
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-zinc-100 rounded-full border border-zinc-200"
              >
                <NavigationIcon className="w-5 h-5 text-zinc-700" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-6 left-6 z-[999] bg-white/95 backdrop-blur-xl border border-zinc-200 rounded-2xl p-4 shadow-lg max-w-[200px]">
        <h4 className="font-semibold text-foreground mb-2 text-sm">Legende</h4>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-muted-foreground">Gesponsert</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-zinc-300 rounded-full"></div>
            <span className="text-xs text-muted-foreground">Normal</span>
          </div>
        </div>
      </div>
    </div>
  );
}