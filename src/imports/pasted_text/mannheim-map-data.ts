import React, { useState } from 'react';

const locations = [
  { id: 1, name: 'MS Connexion', x: 35, y: 65, type: 'club' },
  { id: 2, name: 'Capitol', x: 68, y: 52, type: 'club' },
  { id: 3, name: 'Hagestolz', x: 52, y: 45, type: 'club' },
  { id: 4, name: '7er Club', x: 48, y: 58, type: 'club' },
  { id: 5, name: 'Alte Feuerwache', x: 60, y: 38, type: 'club' },
  { id: 6, name: 'Mafinex', x: 28, y: 72, type: 'club' },
  { id: 7, name: 'Soho Club', x: 55, y: 50, type: 'club' },
  { id: 8, name: 'Ella & Louis', x: 43, y: 42, type: 'club' },
  { id: 9, name: 'Kulturhalle', x: 72, y: 68, type: 'club' },
  { id: 10, name: 'Milk & Sugar', x: 38, y: 48, type: 'club' },
  { id: 11, name: 'Zimmer', x: 58, y: 44, type: 'club' },
  { id: 12, name: 'Basf Feierabendhaus', x: 18, y: 78, type: 'club' },
  { id: 13, name: 'Tiefbau', x: 45, y: 52, type: 'club' },
  { id: 14, name: 'Café Vienna', x: 62, y: 56, type: 'club' },
  { id: 15, name: 'Stadtpark Bar', x: 70, y: 42, type: 'club' },
  { id: 16, name: 'Das Zimmer', x: 33, y: 58, type: 'club' },
  { id: 17, name: 'Nachtgalerie', x: 56, y: 62, type: 'club' },
  { id: 18, name: 'Zephyr', x: 64, y: 48, type: 'club' },
  { id: 19, name: 'Stadtfest Mannheim', x: 50, y: 48, type: 'event' },
  { id: 20, name: 'Maimarkt', x: 75, y: 70, type: 'event' },
  { id: 21, name: 'Lichterfest', x: 67, y: 38, type: 'event' },
  { id: 22, name: 'Konzert am Wasserturm', x: 65, y: 45, type: 'event' },
  { id: 23, name: 'Street Food Festival', x: 40, y: 65, type: 'event' },
  { id: 24, name: 'Jazz im Schloss', x: 50, y: 34, type: 'event' },
  { id: 25, name: 'Weihnachtsmarkt', x: 53, y: 52, type: 'event' },
  { id: 26, name: 'Open Air Kino', x: 68, y: 36, type: 'event' },
  { id: 27, name: 'Kunstmeile', x: 60, y: 55, type: 'event' },
  { id: 28, name: 'SAP Arena Konzert', x: 82, y: 75, type: 'event' }
];

export default function Component() {
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState('alle');

  const filteredLocations = filter === 'alle' 
    ? locations 
    : locations.filter(loc => loc.type === filter);

  return (
    <div className="w-full h-screen bg-white p-2">
      {/* Map Container */}
      <div className="relative w-full h-full bg-white border-4 border-gray-600 rounded-lg overflow-hidden">
        
        {/* Simplified Mannheim Map */}
        <svg className="absolute inset-0 w-full h-full">
          {/* Grid */}
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="gray" strokeWidth="0.5" opacity="0.15"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#smallGrid)" />
          
          {/* Neckar River - flowing through the city */}
          <path 
            d="M 0 20% Q 30% 18%, 50% 22% T 100% 25%" 
            stroke="#9CA3AF" 
            strokeWidth="60" 
            fill="none"
            opacity="0.4"
          />
          
          {/* City Center Grid (Quadrate) - detailed blocks */}
          <rect x="46%" y="42%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          <rect x="49%" y="42%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          <rect x="52%" y="42%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          <rect x="55%" y="42%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          
          <rect x="46%" y="46%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          <rect x="49%" y="46%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          <rect x="52%" y="46%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          <rect x="55%" y="46%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          
          <rect x="46%" y="50%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          <rect x="49%" y="50%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          <rect x="52%" y="50%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          <rect x="55%" y="50%" width="25" height="30" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          
          {/* Main Streets - more detailed network */}
          {/* Vertical streets */}
          <line x1="30%" y1="10%" x2="30%" y2="90%" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
          <line x1="40%" y1="10%" x2="40%" y2="90%" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
          <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#9CA3AF" strokeWidth="4" opacity="0.5" />
          <line x1="60%" y1="10%" x2="60%" y2="90%" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
          <line x1="70%" y1="10%" x2="70%" y2="90%" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
          
          {/* Horizontal streets */}
          <line x1="10%" y1="30%" x2="90%" y2="30%" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
          <line x1="10%" y1="40%" x2="90%" y2="40%" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
          <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="#9CA3AF" strokeWidth="4" opacity="0.5" />
          <line x1="10%" y1="60%" x2="90%" y2="60%" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
          <line x1="10%" y1="70%" x2="90%" y2="70%" stroke="#9CA3AF" strokeWidth="3" opacity="0.4" />
          
          {/* Additional smaller streets */}
          <line x1="20%" y1="35%" x2="80%" y2="35%" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
          <line x1="20%" y1="45%" x2="80%" y2="45%" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
          <line x1="20%" y1="55%" x2="80%" y2="55%" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
          <line x1="20%" y1="65%" x2="80%" y2="65%" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
          <line x1="20%" y1="75%" x2="80%" y2="75%" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
          
          <line x1="35%" y1="15%" x2="35%" y2="85%" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
          <line x1="45%" y1="15%" x2="45%" y2="85%" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
          <line x1="55%" y1="15%" x2="55%" y2="85%" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
          <line x1="65%" y1="15%" x2="65%" y2="85%" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
          <line x1="75%" y1="15%" x2="75%" y2="85%" stroke="#9CA3AF" strokeWidth="2" opacity="0.25" />
          
          {/* Parks and green areas */}
          <rect x="65%" y="35%" width="80" height="70" fill="#A3B18A" opacity="0.2" />
          <rect x="25%" y="65%" width="60" height="50" fill="#A3B18A" opacity="0.2" />
          
          {/* Additional parks */}
          <rect x="15%" y="25%" width="50" height="40" fill="#A3B18A" opacity="0.15" />
          <circle cx="78%" cy="60%" r="35" fill="#A3B18A" opacity="0.18" />
          
          {/* Rhein River */}
          <path 
            d="M 0 85% L 35% 88% L 100% 90%" 
            stroke="#9CA3AF" 
            strokeWidth="45" 
            fill="none"
            opacity="0.35"
          />
          
          {/* More quadrate blocks */}
          <rect x="43%" y="54%" width="20" height="25" fill="none" stroke="#6B7280" strokeWidth="1.5" opacity="0.25" />
          <rect x="46%" y="54%" width="20" height="25" fill="none" stroke="#6B7280" strokeWidth="1.5" opacity="0.25" />
          <rect x="49%" y="54%" width="20" height="25" fill="none" stroke="#6B7280" strokeWidth="1.5" opacity="0.25" />
          <rect x="52%" y="54%" width="20" height="25" fill="none" stroke="#6B7280" strokeWidth="1.5" opacity="0.25" />
          <rect x="55%" y="54%" width="20" height="25" fill="none" stroke="#6B7280" strokeWidth="1.5" opacity="0.25" />
          <rect x="58%" y="54%" width="20" height="25" fill="none" stroke="#6B7280" strokeWidth="1.5" opacity="0.25" />
          
          {/* Jungbusch Area */}
          <polygon points="54%,38% 62%,38% 62%,48% 54%,48%" fill="#6B7280" opacity="0.1" stroke="#6B7280" strokeWidth="2" opacity="0.3" />
          
          {/* Lindenhof Area */}
          <rect x="35%" y="55%" width="120" height="100" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.2" />
          
          {/* Hauptbahnhof */}
          <rect x="42%" y="35%" width="40" height="25" fill="#4B5563" opacity="0.3" stroke="#374151" strokeWidth="2" />
          
          {/* Wasserturm (water tower) */}
          <circle cx="65%" cy="45%" r="15" fill="none" stroke="#6B7280" strokeWidth="2" opacity="0.4" />
          
          {/* Additional landmarks and buildings */}
          {/* Schloss */}
          <rect x="48%" y="32%" width="45" height="35" fill="#6B7280" opacity="0.25" stroke="#4B5563" strokeWidth="2" />
          
          {/* Kunsthalle */}
          <rect x="68%" y="48%" width="35" height="28" fill="#6B7280" opacity="0.2" stroke="#4B5563" strokeWidth="1.5" />
          
          {/* Rosengarten */}
          <polygon points="62%,42% 68%,42% 65%,38%" fill="#6B7280" opacity="0.25" stroke="#4B5563" strokeWidth="1.5" />
          <rect x="62%" y="42%" width="30" height="20" fill="#6B7280" opacity="0.2" stroke="#4B5563" strokeWidth="1.5" />
          
          {/* SAP Arena area */}
          <circle cx="82%" cy="75%" r="25" fill="none" stroke="#6B7280" strokeWidth="2.5" opacity="0.3" />
          
          {/* Additional neighborhood areas */}
          {/* Neckarstadt */}
          <rect x="50%" y="15%" width="90" height="85" fill="none" stroke="#9CA3AF" strokeWidth="1.5" opacity="0.2" strokeDasharray="5,5" />
          
          {/* Schwetzingerstadt */}
          <rect x="60%" y="60%" width="100" height="90" fill="none" stroke="#9CA3AF" strokeWidth="1.5" opacity="0.2" strokeDasharray="5,5" />
        </svg>

        {/* Location Markers */}
        {filteredLocations.map((location) => (
          <div
            key={location.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${location.x}%`,
              top: `${location.y}%`
            }}
            onMouseEnter={() => setHoveredId(location.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Pin Marker - different colors for clubs and events */}
            <div className="relative">
              {location.type === 'club' ? (
                <svg width="30" height="37" viewBox="0 0 40 50">
                  <path
                    d="M20 0 C9 0 0 9 0 20 C0 25 3 30 20 50 C37 30 40 25 40 20 C40 9 31 0 20 0 Z"
                    fill="#6B7280"
                    stroke="#374151"
                    strokeWidth="2"
                  />
                  <circle cx="20" cy="18" r="6" fill="#E5E7EB" />
                </svg>
              ) : (
                <svg width="30" height="37" viewBox="0 0 40 50">
                  <path
                    d="M20 0 C9 0 0 9 0 20 C0 25 3 30 20 50 C37 30 40 25 40 20 C40 9 31 0 20 0 Z"
                    fill="#4B5563"
                    stroke="#1F2937"
                    strokeWidth="2"
                  />
                  <circle cx="20" cy="18" r="6" fill="#D1D5DB" />
                </svg>
              )}
              
              {/* Label on hover */}
              {hoveredId === location.id && (
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-gray-700 text-white px-3 py-2 border-2 border-gray-800 text-sm">
                  {location.name}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Simple Legend */}
        <div className="absolute bottom-4 left-4 bg-white border-2 border-gray-800 p-3 rounded shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-gray-400"></div>
              <span className="text-sm text-gray-700">Neckar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-1 bg-gray-500"></div>
              <span className="text-sm text-gray-700">Innenstadt</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="25" viewBox="0 0 40 50">
                <path
                  d="M20 0 C9 0 0 9 0 20 C0 25 3 30 20 50 C37 30 40 25 40 20 C40 9 31 0 20 0 Z"
                  fill="#6B7280"
                  stroke="#374151"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-sm text-gray-700">Clubs</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="20" height="25" viewBox="0 0 40 50">
                <path
                  d="M20 0 C9 0 0 9 0 20 C0 25 3 30 20 50 C37 30 40 25 40 20 C40 9 31 0 20 0 Z"
                  fill="#4B5563"
                  stroke="#1F2937"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-sm text-gray-700">Events</span>
            </div>
          </div>
        </div>

        {/* Title and Filter */}
        <div className="absolute top-4 left-4 bg-white border-2 border-gray-800 px-4 py-2 rounded shadow-lg">
          <h1 className="text-xl text-gray-700 mb-3">Mannheim</h1>
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('alle')}
              className={`px-3 py-1 border-2 transition-colors rounded ${
                filter === 'alle' 
                  ? 'bg-gray-700 text-white border-gray-800' 
                  : 'bg-white text-gray-700 border-gray-600 hover:bg-gray-100'
              }`}
            >
              Alle
            </button>
            <button
              onClick={() => setFilter('club')}
              className={`px-3 py-1 border-2 transition-colors rounded ${
                filter === 'club' 
                  ? 'bg-gray-700 text-white border-gray-800' 
                  : 'bg-white text-gray-700 border-gray-600 hover:bg-gray-100'
              }`}
            >
              Clubs
            </button>
            <button
              onClick={() => setFilter('event')}
              className={`px-3 py-1 border-2 transition-colors rounded ${
                filter === 'event' 
                  ? 'bg-gray-700 text-white border-gray-800' 
                  : 'bg-white text-gray-700 border-gray-600 hover:bg-gray-100'
              }`}
            >
              Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}