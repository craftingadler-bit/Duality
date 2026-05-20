import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Euro, MapPin, Clock, MessageCircle, Heart, Share2, Star, Shield } from 'lucide-react';
import { useMemo } from 'react';

type ListingCategory = 'SERVICE' | 'PHYSICAL' | 'DIGITAL';

export function MarketplaceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const listings = useMemo(() => [
    // --- IDs 1 - 6 ---
    {
      id: 1,
      title: 'BWL Skript - Zusammenfassung',
      price: 15,
      category: 'DIGITAL' as ListingCategory,
      seller: { name: 'Lisa M.', rating: 4.9, reviews: 12, verified: true, major: 'BWL', semester: 3 },
      location: 'Mannheim',
      images: ['https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800'],
      postedTime: '2h ago',
      description: 'Komplette BWL Zusammenfassung für die Klausurvorbereitung.',
      isDigital: true, fileSize: '2.5 MB', fileType: 'PDF'
    },
    {
      id: 2,
      title: 'Tutoring: Mathematik 1',
      price: 25,
      category: 'SERVICE' as ListingCategory,
      seller: { name: 'Tom K.', rating: 4.8, reviews: 15, verified: true, major: 'Informatik', semester: 5 },
      location: 'Online/Campus',
      images: ['https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800'],
      postedTime: '5h ago',
      description: 'Erfahrener Tutor für Mathe 1 - alle Semester.',
      hourlyRate: 25, duration: 60
    },
    {
      id: 3,
      title: 'IKEA Desk & Chair Set',
      price: 80,
      category: 'PHYSICAL' as ListingCategory,
      seller: { name: 'Anna S.', rating: 5.0, reviews: 8, verified: true, major: 'BWL', semester: 2 },
      location: 'Lindenhof',
      images: ['https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800'],
      condition: 'Good',
      postedTime: '1d ago',
      description: 'Perfektes Schreibtisch-Set für Studenten.'
    },
    {
      id: 4,
      title: 'Programmieren Nachhilfe',
      price: 30,
      category: 'SERVICE' as ListingCategory,
      seller: { name: 'Max K.', rating: 4.7, reviews: 10, verified: true, major: 'Informatik', semester: 6 },
      location: 'Neckarstadt',
      images: ['https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800'],
      postedTime: '1d ago',
      description: 'Java, Python, Web Development Nachhilfe.',
      hourlyRate: 30, duration: 90
    },
    {
      id: 5,
      title: 'Informatik Altklausuren',
      price: 10,
      category: 'DIGITAL' as ListingCategory,
      seller: { name: 'Felix W.', rating: 4.6, reviews: 7, verified: true, major: 'Informatik', semester: 4 },
      location: 'Digital',
      images: ['https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800'],
      postedTime: '2d ago',
      description: 'Altklausuren inklusive Lösungen.',
      isDigital: true, fileSize: '1.8 MB', fileType: 'PDF'
    },
    {
      id: 6,
      title: 'City Bike - 21 Speed',
      price: 120,
      category: 'PHYSICAL' as ListingCategory,
      seller: { name: 'Sarah L.', rating: 4.9, reviews: 11, verified: true, major: 'Maschinenbau', semester: 3 },
      location: 'Jungbusch',
      images: ['https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800'],
      condition: 'Like New',
      postedTime: '3d ago',
      description: 'Top City Bike inkl. Schloss.'
    },
    // --- IDs 8 - 15 (Die Fehlenden) ---
    {
      id: 8,
      title: "Air Fryer (Philips)",
      price: 45,
      category: "PHYSICAL" as ListingCategory,
      seller: { name: "Julia B.", rating: 4.4, reviews: 5, verified: false, major: "Winfo", semester: 2 },
      location: "Quadrate",
      images: ["https://images.unsplash.com/photo-1626074353765-517a681e40be?w=800"],
      condition: "Used - Great",
      postedTime: "4h ago",
      description: "Kaum benutzt, ideal für kleine Wohnungen."
    },
    {
      id: 9,
      title: "Proofreading Bachelor Thesis",
      price: 40,
      category: "SERVICE" as ListingCategory,
      seller: { name: "Elena R.", rating: 4.9, reviews: 18, verified: true, major: "Lehramt", semester: 6 },
      location: "Online",
      images: ["https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800"],
      postedTime: "12h ago",
      description: "Check auf Grammatik, Stil und Struktur."
    },
    {
      id: 10,
      title: "Microeconomics Notes",
      price: 12,
      category: "DIGITAL" as ListingCategory,
      seller: { name: "Kevin P.", rating: 4.5, reviews: 9, verified: true, major: "VWL", semester: 4 },
      location: "Digital",
      images: ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800"],
      postedTime: "1d ago",
      description: "Kommentierte Folien und Fallstudien.",
      isDigital: true, fileSize: '3.1 MB', fileType: 'PDF'
    },
    {
      id: 11,
      title: "Logitech Gaming Mouse",
      price: 35,
      category: "PHYSICAL" as ListingCategory,
      seller: { name: "Nils H.", rating: 4.7, reviews: 12, verified: true, major: "Informatik", semester: 3 },
      location: "Schwetzingerstadt",
      images: ["https://images.unsplash.com/photo-1527814732934-94a1955093c8?w=800"],
      condition: "Used",
      postedTime: "1d ago",
      description: "Wireless G305, top Zustand."
    },
    {
      id: 12,
      title: "Grocery Help / Shopping",
      price: 10,
      category: "SERVICE" as ListingCategory,
      seller: { name: "Lukas T.", rating: 5.0, reviews: 4, verified: false, major: "Soziale Arbeit", semester: 2 },
      location: "Mannheim",
      images: ["https://images.unsplash.com/photo-1506484381205-f7945653044d?w=800"],
      postedTime: "2d ago",
      description: "Helfe beim Einkaufen, falls du krank bist."
    },
    {
      id: 13,
      title: "Yoga Mat (Manduka)",
      price: 20,
      category: "PHYSICAL" as ListingCategory,
      seller: { name: "Sophia G.", rating: 4.8, reviews: 6, verified: true, major: "Medizin", semester: 4 },
      location: "Neckarau",
      images: ["https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=800"],
      condition: "Like New",
      postedTime: "2d ago",
      description: "Rutschfeste, ökologische Matte."
    },
    {
      id: 14,
      title: "Python Scripting Template",
      price: 20,
      category: "DIGITAL" as ListingCategory,
      seller: { name: "Chris D.", rating: 4.9, reviews: 15, verified: true, major: "Informatik", semester: 5 },
      location: "Digital",
      images: ["https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800"],
      postedTime: "3d ago",
      description: "Wiederverwendbare Templates für Datenanalyse.",
      isDigital: true, fileSize: '0.5 MB', fileType: 'ZIP'
    },
    {
      id: 15,
      title: "Moving Help (Weekend)",
      price: 50,
      category: "SERVICE" as ListingCategory,
      seller: { name: "Basti L.", rating: 4.6, reviews: 8, verified: false, major: "Mathe", semester: 4 },
      location: "Mannheim",
      images: ["https://images.unsplash.com/photo-1520038410233-7141be7e6f97?w=800"],
      postedTime: "3d ago",
      description: "Helfe beim Kisten schleppen, habe einen Van."
    },
    // --- IDs 16 - 25 ---
    { id: 16, title: "Dell 24 Zoll Monitor", price: 55, category: "PHYSICAL" as ListingCategory, seller: { name: "Jonas H.", rating: 4.5, reviews: 4, verified: true, major: "Winfo", semester: 4 }, location: "Quadrate", images: ["https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800"], condition: "Used - Good", postedTime: "1h ago", description: "Inklusive HDMI-Kabel." },
    { id: 17, title: "Nespresso Maschine", price: 25, category: "PHYSICAL" as ListingCategory, seller: { name: "Lara P.", rating: 4.8, reviews: 9, verified: false, major: "BWL", semester: 2 }, location: "Jungbusch", images: ["https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=800"], condition: "Like New", postedTime: "3h ago", description: "Wenig genutzt." },
    { id: 18, title: "Große Monstera Pflanze", price: 20, category: "PHYSICAL" as ListingCategory, seller: { name: "Mila K.", rating: 5.0, reviews: 2, verified: true, major: "Design", semester: 5 }, location: "Neckarstadt", images: ["https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800"], condition: "Healthy", postedTime: "5h ago", description: "Ca. 80cm hoch." },
    { id: 19, title: "Samsung Mikrowelle", price: 35, category: "PHYSICAL" as ListingCategory, seller: { name: "Kevin R.", rating: 4.2, reviews: 6, verified: true, major: "VWL", semester: 3 }, location: "Lindenhof", images: ["https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=800"], condition: "Used", postedTime: "12h ago", description: "Funktioniert einwandfrei." },
    { id: 20, title: "Sony WH-1000XM4", price: 160, category: "PHYSICAL" as ListingCategory, seller: { name: "Tim S.", rating: 4.9, reviews: 21, verified: true, major: "Informatik", semester: 6 }, location: "Schwetzinger", images: ["https://images.unsplash.com/photo-1618366712277-722026af828f?w=800"], condition: "Excellent", postedTime: "1d ago", description: "Beste Noise-Cancelling Headphones." },
    { id: 21, title: "Mathe Lehrbuch", price: 12, category: "PHYSICAL" as ListingCategory, seller: { name: "Sarah G.", rating: 4.7, reviews: 3, verified: true, major: "Mathe", semester: 2 }, location: "Campus", images: ["https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800"], condition: "Marked", postedTime: "1d ago", description: "Ideal für Erstis." },
    { id: 22, title: "LED Stehlampe", price: 15, category: "PHYSICAL" as ListingCategory, seller: { name: "David L.", rating: 4.4, reviews: 5, verified: false, major: "Jura", semester: 4 }, location: "Quadrate", images: ["https://images.unsplash.com/photo-1507473884658-ec71b61223e6?w=800"], condition: "Good", postedTime: "2d ago", description: "Dimmbar." },
    { id: 23, title: "Vintage DHBW Hoodie", price: 18, category: "PHYSICAL" as ListingCategory, seller: { name: "Basti W.", rating: 4.9, reviews: 14, verified: true, major: "BWL", semester: 6 }, location: "Oststadt", images: ["https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800"], condition: "Used", postedTime: "2d ago", description: "Größe XL, sehr gemütlich." },
    { id: 24, title: "Mini-Kühlschrank", price: 40, category: "PHYSICAL" as ListingCategory, seller: { name: "Erik M.", rating: 4.1, reviews: 8, verified: true, major: "Winfo", semester: 3 }, location: "Jungbusch", images: ["https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"], condition: "Good", postedTime: "3d ago", description: "Für Getränke unterm Schreibtisch." },
    { id: 25, title: "Waffeleisen", price: 10, category: "PHYSICAL" as ListingCategory, seller: { name: "Nina F.", rating: 5.0, reviews: 5, verified: true, major: "Design", semester: 1 }, location: "Neckarau", images: ["https://images.unsplash.com/photo-1585822310023-376045479901?w=800"], condition: "Used", postedTime: "3d ago", description: "In Herzform." }
  ], []);

  const listing = listings.find(l => l.id === Number(id));

  if (!listing) {
    return (
      <div className="h-full flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl text-foreground mb-2">Listing not found</h2>
          <button onClick={() => navigate('/marketplace')} className="text-primary hover:underline">Back to Marketplace</button>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category: ListingCategory) => {
    const colors = { SERVICE: 'bg-blue-500 text-white', PHYSICAL: 'bg-orange-500 text-white', DIGITAL: 'bg-purple-500 text-white' };
    return colors[category];
  };

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="flex-1 overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate('/marketplace')} className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"><ArrowLeft className="w-5 h-5" /></button>
          <div className="flex-1 min-w-0"><h2 className="text-lg truncate text-foreground font-semibold">{listing.title}</h2></div>
          <button className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted"><Share2 className="w-5 h-5" /></button>
        </div>

        {/* Hero */}
        <div className="relative h-80 bg-muted">
          <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover" />
          <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${getCategoryColor(listing.category)}`}>{listing.category}</div>
        </div>

        {/* Content */}
        <div className="px-6 py-6 max-w-2xl mx-auto">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2">{listing.title}</h1>
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-medium"><MapPin className="w-4 h-4" /> <span>{listing.location}</span><span>•</span><Clock className="w-4 h-4" /> <span>{listing.postedTime}</span></div>
            </div>
            <div className="text-right text-3xl font-bold text-foreground flex items-center gap-1"><Euro className="w-6 h-6" /> {listing.price}</div>
          </div>

          {listing.isDigital && (
            <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 mb-6 flex items-start gap-3">
              <Shield className="w-6 h-6 text-purple-600 shrink-0" />
              <div><p className="text-sm font-bold text-purple-900">Sicherer Download</p><p className="text-xs text-purple-700">{listing.fileType} • {listing.fileSize}</p></div>
            </div>
          )}

          {listing.condition && (
            <div className="mb-6"><p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-2">Zustand</p><span className="inline-block px-4 py-2 bg-secondary rounded-xl text-sm font-semibold">{listing.condition}</span></div>
          )}

          <div className="mb-8"><h3 className="font-bold text-zinc-900 mb-3">Beschreibung</h3><p className="text-zinc-600 leading-relaxed">{listing.description}</p></div>

          <div className="mb-8">
            <h3 className="font-bold text-zinc-900 mb-4">Verkäufer</h3>
            <div className="bg-white border border-border rounded-2xl p-5 shadow-sm flex items-center gap-4">
              <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white text-xl font-bold">{listing.seller.name[0]}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2"><h4 className="font-bold text-zinc-900">{listing.seller.name}</h4>{listing.seller.verified && <Shield className="w-4 h-4 text-blue-500 fill-blue-50" />}</div>
                <p className="text-sm text-zinc-500 font-medium">{listing.seller.major} • {listing.seller.semester}. Sem.</p>
                <div className="flex items-center gap-1 mt-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /><span className="text-sm font-bold">{listing.seller.rating}</span><span className="text-xs text-zinc-400">({listing.seller.reviews} Bew.)</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white/80 backdrop-blur-xl border-t border-border p-4">
        <div className="max-w-md mx-auto flex gap-3">
          <button className="w-14 h-14 border-2 border-primary rounded-2xl flex items-center justify-center shrink-0"><Heart className="w-6 h-6 text-primary" /></button>
          <button
            onClick={() => navigate(`/marketplace/${id}/contact`)}
            className="flex-1 bg-primary text-white py-4 rounded-2xl font-bold text-lg hover:bg-red-700 shadow-lg flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-6 h-6" /> Nachricht senden
          </button>
        </div>
      </div>
    </div>
  );
}