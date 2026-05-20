import { useState } from 'react';
import { useNavigate } from 'react-router';
import { X, MapPin, Calendar, Users, ArrowLeft, Navigation as NavigationIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Event {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  attendees: number;
  maxAttendees: number;
  x: number;
  y: number;
  sponsored: boolean;
}

const mannheimEvents: Event[] = [
  { id: 1, title: 'Volleyball at Neckarwiese', category: 'Sports', date: 'Morgen, 18:00', location: 'Neckarwiese', attendees: 8, maxAttendees: 12, x: 55, y: 22, sponsored: false },
  { id: 2, title: 'Gaming Night @ Campus', category: 'Gaming', date: 'Freitag, 20:00', location: 'DHBW Campus', attendees: 15, maxAttendees: 20, x: 72, y: 72, sponsored: true },
  { id: 3, title: 'Ceramic Painting Workshop', category: 'Art', date: 'Samstag, 14:00', location: 'Kunsthalle Mannheim', attendees: 5, maxAttendees: 10, x: 68, y: 48, sponsored: true },
  { id: 4, title: 'Pub Crawl Mannheim', category: 'Party', date: 'Samstag, 21:00', location: 'Jungbusch', attendees: 24, maxAttendees: 30, x: 54, y: 38, sponsored: false },
  { id: 5, title: 'Study Group – Analysis II', category: 'Study', date: 'Sonntag, 15:00', location: 'Stadtbibliothek', attendees: 6, maxAttendees: 8, x: 62, y: 56, sponsored: false },
  { id: 6, title: 'Coffee & Code', category: 'Tech', date: 'Montag, 16:00', location: 'Café Flo', attendees: 4, maxAttendees: 6, x: 48, y: 52, sponsored: false },
  { id: 7, title: 'Jazz im Schloss', category: 'Art', date: 'Freitag, 19:00', location: 'Schloss Mannheim', attendees: 20, maxAttendees: 40, x: 50, y: 34, sponsored: true },
  { id: 8, title: 'SAP Arena Konzert', category: 'Party', date: 'Samstag, 20:00', location: 'SAP Arena', attendees: 30, maxAttendees: 50, x: 82, y: 75, sponsored: false },
];

const categoryColors: Record<string, string> = {
  Sports: '#ef4444',
  Gaming: '#8b5cf6',
  Art: '#f59e0b',
  Party: '#ec4899',
  Study: '#3b82f6',
  Tech: '#10b981',
};

const categoryEmoji: Record<string, string> = {
  Sports: '⚽',
  Gaming: '🎮',
  Art: '🎨',
  Party: '🎉',
  Study: '📚',
  Tech: '💻',
};

export function MapView() {
  const navigate = useNavigate();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', 'Sports', 'Gaming', 'Art', 'Party', 'Study', 'Tech'];

  const filteredEvents = filterCategory === 'all'
    ? mannheimEvents
    : mannheimEvents.filter(e => e.category === filterCategory);

  return (
    <div className="h-full relative bg-white flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-xl border-b border-zinc-200 shadow-sm z-10">
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
                    ? 'bg-[#E10600] text-white shadow-lg shadow-red-500/30'
                    : 'bg-zinc-100 text-zinc-700 hover:bg-zinc-200'
                }`}
              >
                {cat === 'all' ? 'Alle' : cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative overflow-hidden bg-white">
        <div className="relative w-full h-full">
          {/* SVG Fictional Mannheim Map */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
            {/* Background */}
            <rect width="800" height="600" fill="white" />

            {/* Grid */}
            <defs>
              <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#9CA3AF" strokeWidth="0.4" opacity="0.2" />
              </pattern>
            </defs>
            <rect width="800" height="600" fill="url(#mapGrid)" />

            {/* Neckar River */}
            <path
              d="M 0 130 Q 200 110 400 135 T 800 150"
              stroke="#9CA3AF"
              strokeWidth="55"
              fill="none"
              opacity="0.35"
            />
            <path
              d="M 0 130 Q 200 110 400 135 T 800 150"
              stroke="#D1D5DB"
              strokeWidth="50"
              fill="none"
              opacity="0.4"
            />

            {/* Rhein River */}
            <path
              d="M 0 510 L 280 530 L 800 540"
              stroke="#9CA3AF"
              strokeWidth="45"
              fill="none"
              opacity="0.3"
            />
            <path
              d="M 0 510 L 280 530 L 800 540"
              stroke="#D1D5DB"
              strokeWidth="40"
              fill="none"
              opacity="0.35"
            />

            {/* Parks – green areas */}
            <rect x="520" y="210" width="100" height="80" rx="6" fill="#A3B18A" opacity="0.25" />
            <rect x="200" y="390" width="80" height="65" rx="6" fill="#A3B18A" opacity="0.22" />
            <rect x="120" y="150" width="65" height="45" rx="5" fill="#A3B18A" opacity="0.2" />
            <circle cx="624" cy="360" r="42" fill="#A3B18A" opacity="0.2" />

            {/* Main streets – vertical */}
            <line x1="240" y1="80" x2="240" y2="540" stroke="#9CA3AF" strokeWidth="4" opacity="0.45" />
            <line x1="320" y1="80" x2="320" y2="540" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
            <line x1="400" y1="80" x2="400" y2="540" stroke="#6B7280" strokeWidth="5" opacity="0.5" />
            <line x1="480" y1="80" x2="480" y2="540" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
            <line x1="560" y1="80" x2="560" y2="540" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
            <line x1="640" y1="80" x2="640" y2="540" stroke="#9CA3AF" strokeWidth="3" opacity="0.35" />

            {/* Main streets – horizontal */}
            <line x1="80" y1="180" x2="720" y2="180" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
            <line x1="80" y1="240" x2="720" y2="240" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
            <line x1="80" y1="300" x2="720" y2="300" stroke="#6B7280" strokeWidth="5" opacity="0.5" />
            <line x1="80" y1="360" x2="720" y2="360" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
            <line x1="80" y1="420" x2="720" y2="420" stroke="#9CA3AF" strokeWidth="3" opacity="0.35" />
            <line x1="80" y1="480" x2="720" y2="480" stroke="#9CA3AF" strokeWidth="2.5" opacity="0.3" />

            {/* Secondary streets */}
            <line x1="160" y1="120" x2="160" y2="500" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
            <line x1="280" y1="120" x2="280" y2="500" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
            <line x1="360" y1="120" x2="360" y2="500" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
            <line x1="440" y1="120" x2="440" y2="500" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
            <line x1="520" y1="120" x2="520" y2="500" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
            <line x1="600" y1="120" x2="600" y2="500" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
            <line x1="80" y1="210" x2="720" y2="210" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
            <line x1="80" y1="270" x2="720" y2="270" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
            <line x1="80" y1="330" x2="720" y2="330" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
            <line x1="80" y1="390" x2="720" y2="390" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
            <line x1="80" y1="450" x2="720" y2="450" stroke="#9CA3AF" strokeWidth="1.5" opacity="0.2" />

            {/* Quadrate blocks (Mannheim grid) – prominent center */}
            {[344, 364, 384, 404, 424, 444, 464].map((x) =>
              [252, 272, 292, 312, 332, 352].map((y) => (
                <rect key={`${x}-${y}`} x={x} y={y} width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="1.5" opacity="0.35" />
              ))
            )}
            {/* Extra row of quadrate blocks */}
            {[324, 344, 364, 384, 404, 424, 444, 464, 484].map((x) =>
              [232].map((y) => (
                <rect key={`ext-${x}-${y}`} x={x} y={y} width="18" height="18" fill="none" stroke="#6B7280" strokeWidth="1" opacity="0.25" />
              ))
            )}

            {/* Landmarks */}
            {/* Hauptbahnhof */}
            <rect x="336" y="210" width="50" height="30" rx="3" fill="#E5E7EB" opacity="0.9" stroke="#6B7280" strokeWidth="2" />
            <text x="361" y="229" textAnchor="middle" fill="#374151" fontSize="8" fontWeight="700">Hbf</text>

            {/* Schloss */}
            <rect x="384" y="192" width="58" height="38" rx="3" fill="#F3F4F6" opacity="0.9" stroke="#6B7280" strokeWidth="2" />
            <text x="413" y="215" textAnchor="middle" fill="#374151" fontSize="8" fontWeight="700">Schloss</text>

            {/* Wasserturm */}
            <circle cx="520" cy="270" r="18" fill="none" stroke="#6B7280" strokeWidth="2.5" opacity="0.6" />
            <circle cx="520" cy="270" r="7" fill="#D1D5DB" opacity="0.8" />
            <text x="520" y="296" textAnchor="middle" fill="#6B7280" fontSize="7" fontWeight="600">Wasserturm</text>

            {/* Kunsthalle */}
            <rect x="544" y="288" width="42" height="26" rx="3" fill="#F3F4F6" opacity="0.85" stroke="#9CA3AF" strokeWidth="1.5" />
            <text x="565" y="305" textAnchor="middle" fill="#6B7280" fontSize="6.5" fontWeight="600">Kunsthalle</text>

            {/* SAP Arena */}
            <circle cx="656" cy="450" r="28" fill="none" stroke="#6B7280" strokeWidth="2.5" opacity="0.45" />
            <text x="656" y="455" textAnchor="middle" fill="#6B7280" fontSize="7" fontWeight="600">SAP Arena</text>

            {/* Rosengarten */}
            <rect x="494" y="250" width="36" height="24" rx="3" fill="#F3F4F6" opacity="0.85" stroke="#9CA3AF" strokeWidth="1.5" />
            <text x="512" y="267" textAnchor="middle" fill="#6B7280" fontSize="6" fontWeight="600">Rosengarten</text>

            {/* Jungbusch area */}
            <polygon points="432,228 496,228 496,304 432,304" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeDasharray="5,4" opacity="0.4" />
            <text x="464" y="268" textAnchor="middle" fill="#9CA3AF" fontSize="6.5" fontWeight="500">Jungbusch</text>

            {/* River labels */}
            <text x="80" y="122" fill="#9CA3AF" fontSize="11" fontWeight="700" opacity="0.8">Neckar</text>
            <text x="80" y="522" fill="#9CA3AF" fontSize="11" fontWeight="700" opacity="0.7">Rhein</text>
          </svg>

          {/* Event Markers */}
          {filteredEvents.map((event) => {
            const color = categoryColors[event.category] || '#6b7280';
            const isHovered = hoveredId === event.id;
            const isSelected = selectedEvent?.id === event.id;

            return (
              <div
                key={event.id}
                className="absolute cursor-pointer"
                style={{ left: `${event.x}%`, top: `${event.y}%`, transform: 'translate(-50%, -100%)', zIndex: isHovered || isSelected ? 20 : 10 }}
                onMouseEnter={() => setHoveredId(event.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedEvent(event)}
              >
                <motion.div
                  animate={{ scale: isSelected ? 1.3 : isHovered ? 1.15 : 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="relative"
                >
                  {/* Pin shape */}
                  <svg width="32" height="40" viewBox="0 0 32 40">
                    <path
                      d="M16 0 C7 0 0 7 0 16 C0 22 4 27 16 40 C28 27 32 22 32 16 C32 7 25 0 16 0 Z"
                      fill={color}
                      opacity={isSelected ? 1 : 0.92}
                    />
                    {event.sponsored && (
                      <circle cx="16" cy="15" r="9" fill="none" stroke="#E10600" strokeWidth="2.5" />
                    )}
                    <circle cx="16" cy="15" r="5" fill="white" opacity="0.9" />
                  </svg>

                  {/* Hover tooltip */}
                  <AnimatePresence>
                    {(isHovered && !isSelected) && (
                      <motion.div
                        initial={{ opacity: 0, y: 4, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 4, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute bottom-full left-1/2 mb-1 whitespace-nowrap bg-zinc-900 text-white text-xs font-medium px-3 py-1.5 rounded-lg shadow-lg pointer-events-none"
                        style={{ transform: 'translateX(-50%)' }}
                      >
                        <span className="mr-1">{categoryEmoji[event.category]}</span>
                        {event.title}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-zinc-900" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-white border-2 border-gray-300 rounded-xl p-3 shadow-md">
            <p className="text-xs font-bold text-gray-700 mb-2">Kategorien</p>
            <div className="space-y-1.5">
              {Object.entries(categoryColors).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-xs text-gray-600">{cat}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-1.5 border-t border-gray-200 mt-1">
                <div className="w-2.5 h-2.5 rounded-full border-2 border-[#E10600] flex-shrink-0" />
                <span className="text-xs text-gray-600">Gesponsert</span>
              </div>
            </div>
          </div>

          {/* Map label */}
          <div className="absolute top-3 right-3 bg-white border-2 border-gray-300 rounded-lg px-3 py-1.5 shadow-sm">
            <span className="text-xs font-bold text-gray-500 tracking-widest">MANNHEIM</span>
          </div>
        </div>
      </div>

      {/* Event Detail Bottom Sheet */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            key="sheet"
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="absolute bottom-0 left-0 right-0 z-30 bg-white rounded-t-3xl shadow-2xl border-t border-zinc-200"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: categoryColors[selectedEvent.category] }}
                    >
                      {categoryEmoji[selectedEvent.category]} {selectedEvent.category}
                    </span>
                    {selectedEvent.sponsored && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">
                        ⭐ Gesponsert
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{selectedEvent.title}</h3>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setSelectedEvent(null)}
                  className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center ml-2"
                >
                  <X className="w-4 h-4 text-zinc-700" />
                </motion.button>
              </div>

              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span>{selectedEvent.date}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span>{selectedEvent.location}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-sm">
                  <Users className="w-4 h-4 flex-shrink-0" />
                  <span>{selectedEvent.attendees}/{selectedEvent.maxAttendees} Teilnehmer</span>
                  <div className="flex-1 bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${(selectedEvent.attendees / selectedEvent.maxAttendees) * 100}%`,
                        backgroundColor: categoryColors[selectedEvent.category]
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/events/${selectedEvent.id}`)}
                  className="flex-1 bg-[#E10600] text-white py-3 rounded-full font-semibold shadow-lg shadow-red-500/30 text-sm"
                >
                  Event Details
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-3 bg-zinc-100 rounded-full border border-zinc-200"
                >
                  <NavigationIcon className="w-5 h-5 text-zinc-700" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
