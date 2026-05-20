import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  CheckCircle,
  Star,
  Send,
  Euro,
  ChevronRight,
  MessageCircle,
  Shield,
  Tag,
} from 'lucide-react';
import { useState, useMemo } from 'react';

type ListingCategory = 'SERVICE' | 'PHYSICAL' | 'DIGITAL';

const allListings = [
  { id: 1,  title: 'BWL Skript - Zusammenfassung',   price: 15,  category: 'DIGITAL'   as ListingCategory, seller: { name: 'Lisa M.',   rating: 4.9, reviews: 12, verified: true,  major: 'BWL',          semester: 3 } },
  { id: 2,  title: 'Tutoring: Mathematik 1',          price: 25,  category: 'SERVICE'   as ListingCategory, seller: { name: 'Tom K.',   rating: 4.8, reviews: 15, verified: true,  major: 'Informatik',   semester: 5 } },
  { id: 3,  title: 'IKEA Desk & Chair Set',           price: 80,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Anna S.',  rating: 5.0, reviews: 8,  verified: true,  major: 'BWL',          semester: 2 } },
  { id: 4,  title: 'Programmieren Nachhilfe',         price: 30,  category: 'SERVICE'   as ListingCategory, seller: { name: 'Max K.',   rating: 4.7, reviews: 10, verified: true,  major: 'Informatik',   semester: 6 } },
  { id: 5,  title: 'Informatik Altklausuren',         price: 10,  category: 'DIGITAL'   as ListingCategory, seller: { name: 'Felix W.', rating: 4.6, reviews: 7,  verified: true,  major: 'Informatik',   semester: 4 } },
  { id: 6,  title: 'City Bike - 21 Speed',            price: 120, category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Sarah L.', rating: 4.9, reviews: 11, verified: true,  major: 'Maschinenbau', semester: 3 } },
  { id: 8,  title: 'Air Fryer (Philips)',             price: 45,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Julia B.', rating: 4.4, reviews: 5,  verified: false, major: 'Winfo',        semester: 2 } },
  { id: 9,  title: 'Proofreading Bachelor Thesis',    price: 40,  category: 'SERVICE'   as ListingCategory, seller: { name: 'Elena R.', rating: 4.9, reviews: 18, verified: true,  major: 'Lehramt',      semester: 6 } },
  { id: 10, title: 'Microeconomics Notes',            price: 12,  category: 'DIGITAL'   as ListingCategory, seller: { name: 'Kevin P.', rating: 4.5, reviews: 9,  verified: true,  major: 'VWL',          semester: 4 } },
  { id: 11, title: 'Logitech Gaming Mouse',           price: 35,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Nils H.',  rating: 4.7, reviews: 12, verified: true,  major: 'Informatik',   semester: 3 } },
  { id: 12, title: 'Grocery Help / Shopping',         price: 10,  category: 'SERVICE'   as ListingCategory, seller: { name: 'Lukas T.', rating: 5.0, reviews: 4,  verified: false, major: 'Soziale Arbeit', semester: 2 } },
  { id: 13, title: 'Yoga Mat (Manduka)',              price: 20,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Sophia G.',rating: 4.8, reviews: 6,  verified: true,  major: 'Medizin',      semester: 4 } },
  { id: 14, title: 'Python Scripting Template',       price: 20,  category: 'DIGITAL'   as ListingCategory, seller: { name: 'Chris D.', rating: 4.9, reviews: 15, verified: true,  major: 'Informatik',   semester: 5 } },
  { id: 15, title: 'Moving Help (Weekend)',           price: 50,  category: 'SERVICE'   as ListingCategory, seller: { name: 'Basti L.', rating: 4.6, reviews: 8,  verified: false, major: 'Mathe',        semester: 4 } },
  { id: 16, title: 'Dell 24 Zoll Monitor',           price: 55,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Jonas H.', rating: 4.5, reviews: 4,  verified: true,  major: 'Winfo',        semester: 4 } },
  { id: 17, title: 'Nespresso Maschine',             price: 25,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Lara P.',  rating: 4.8, reviews: 9,  verified: false, major: 'BWL',          semester: 2 } },
  { id: 18, title: 'Große Monstera Pflanze',         price: 20,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Mila K.',  rating: 5.0, reviews: 2,  verified: true,  major: 'Design',       semester: 5 } },
  { id: 19, title: 'Samsung Mikrowelle',             price: 35,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Kevin R.', rating: 4.2, reviews: 6,  verified: true,  major: 'VWL',          semester: 3 } },
  { id: 20, title: 'Sony WH-1000XM4',               price: 160, category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Tim S.',   rating: 4.9, reviews: 21, verified: true,  major: 'Informatik',   semester: 6 } },
  { id: 21, title: 'Mathe Lehrbuch',                 price: 12,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Sarah G.', rating: 4.7, reviews: 3,  verified: true,  major: 'Mathe',        semester: 2 } },
  { id: 22, title: 'LED Stehlampe',                  price: 15,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'David L.', rating: 4.4, reviews: 5,  verified: false, major: 'Jura',         semester: 4 } },
  { id: 23, title: 'Vintage DHBW Hoodie',            price: 18,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Basti W.', rating: 4.9, reviews: 14, verified: true,  major: 'BWL',          semester: 6 } },
  { id: 24, title: 'Mini-Kühlschrank',               price: 40,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Erik M.',  rating: 4.1, reviews: 8,  verified: true,  major: 'Winfo',        semester: 3 } },
  { id: 25, title: 'Waffeleisen',                    price: 10,  category: 'PHYSICAL'  as ListingCategory, seller: { name: 'Nina F.',  rating: 5.0, reviews: 5,  verified: true,  major: 'Design',       semester: 1 } },
];

// Templates generic + category-aware
const quickRepliesByCategory: Record<ListingCategory, { icon: string; label: string; text: string }[]> = {
  PHYSICAL: [
    { icon: '❓', label: 'Noch verfügbar?',   text: 'Hallo! Ist der Artikel noch verfügbar?' },
    { icon: '📍', label: 'Abholung',          text: 'Hi! Wo und wann könnte ich den Artikel abholen?' },
    { icon: '💶', label: 'Preis verhandeln',  text: 'Hallo! Wärst du bereit, über den Preis zu verhandeln?' },
    { icon: '📸', label: 'Mehr Fotos',        text: 'Hey! Könntest du noch ein paar weitere Fotos schicken?' },
    { icon: '📦', label: 'Zustand',           text: 'Hi! Kannst du den Zustand des Artikels genauer beschreiben?' },
    { icon: '🤝', label: 'Treffen',           text: 'Ich bin sehr interessiert! Wann wärst du zum Treffen verfügbar?' },
  ],
  SERVICE: [
    { icon: '❓', label: 'Verfügbarkeit',     text: 'Hallo! Wann wärst du verfügbar?' },
    { icon: '📍', label: 'Ort',              text: 'Hi! Findet der Service online oder vor Ort statt?' },
    { icon: '💶', label: 'Paketpreis',        text: 'Hallo! Bietest du auch Pakete oder Rabatte für mehrere Sessions an?' },
    { icon: '🎓', label: 'Erfahrung',         text: 'Hey! Wie viel Erfahrung hast du mit diesem Bereich?' },
    { icon: '📅', label: 'Termin',            text: 'Ich würde gerne einen Termin vereinbaren – passt dir diese Woche etwas?' },
    { icon: '🤝', label: 'Erstes Gespräch',   text: 'Wäre ein kurzes Kennenlerngespräch vorab möglich?' },
  ],
  DIGITAL: [
    { icon: '❓', label: 'Aktualität',        text: 'Hallo! Ist das Material noch aktuell und welchem Semester entspricht es?' },
    { icon: '📄', label: 'Vorschau',          text: 'Hi! Könntest du mir eine kurze Vorschau oder Inhaltsübersicht schicken?' },
    { icon: '💶', label: 'Preis',             text: 'Hallo! Ist der Preis verhandelbar?' },
    { icon: '🔄', label: 'Format',            text: 'In welchem Format wird die Datei bereitgestellt?' },
    { icon: '⭐', label: 'Empfehlung',        text: 'Wie hilfreich war das Material für deine eigene Klausurvorbereitung?' },
    { icon: '✅', label: 'Kaufen',            text: 'Ich bin interessiert – wie funktioniert der Kauf und die Übergabe?' },
  ],
};

const categoryColors: Record<ListingCategory, string> = {
  SERVICE:  'bg-blue-500',
  PHYSICAL: 'bg-orange-500',
  DIGITAL:  'bg-purple-500',
};

const categoryLabels: Record<ListingCategory, string> = {
  SERVICE:  'Service',
  PHYSICAL: 'Physisch',
  DIGITAL:  'Digital',
};

export function MarketplaceContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const listing = useMemo(() => allListings.find(l => l.id === Number(id)), [id]);
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!listing) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-2">Inserat nicht gefunden</h2>
          <button onClick={() => navigate('/marketplace')} className="text-[#E10600]">
            Zurück zum Marketplace
          </button>
        </div>
      </div>
    );
  }

  const { seller } = listing;
  const quickReplies = quickRepliesByCategory[listing.category];

  function handleSend() {
    if (!message.trim()) return;
    setSent(true);
  }

  /* ── Success screen ── */
  if (sent) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white px-6 text-center">
        <div className="w-20 h-20 bg-[#E10600]/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-[#E10600]" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Nachricht gesendet!</h2>
        <p className="text-gray-500 text-sm mb-2">
          Deine Nachricht wurde erfolgreich an{' '}
          <span className="font-medium text-gray-800">{seller.name}</span> gesendet.
        </p>
        <p className="text-gray-400 text-xs mb-8">
          Du erhältst eine Benachrichtigung, sobald {seller.name.split(' ')[0]} antwortet.
        </p>

        <div className="w-full max-w-sm bg-[#E10600]/5 border border-[#E10600]/20 rounded-2xl p-4 mb-8 text-left">
          <p className="text-xs text-[#E10600] font-medium mb-2 flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" /> Deine Nachricht
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={() => navigate(`/marketplace/${id}`)}
            className="w-full py-3 rounded-xl border-2 border-[#E10600] text-[#E10600] font-medium text-sm hover:bg-[#E10600]/5 transition-colors"
          >
            Zurück zum Inserat
          </button>
          <button
            onClick={() => navigate('/marketplace')}
            className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors"
          >
            Alle Inserate ansehen
          </button>
        </div>
      </div>
    );
  }

  /* ── Main screen ── */
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">

      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/marketplace/${id}`)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-[#E10600] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 text-base">
              {seller.name[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-gray-900 text-sm truncate">{seller.name}</span>
                {seller.verified && (
                  <Shield className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{seller.rating}</span>
                <span>·</span>
                <span>{seller.major} • {seller.semester}. Sem.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">

        {/* Listing reference */}
        <button
          onClick={() => navigate(`/marketplace/${id}`)}
          className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-3 hover:bg-gray-100 transition-colors text-left w-full"
        >
          <div className="w-9 h-9 bg-[#E10600]/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Tag className="w-4 h-4 text-[#E10600]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 mb-0.5">Anfrage bezüglich</p>
            <p className="text-sm font-medium text-gray-900 truncate">{listing.title}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className={`text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full ${categoryColors[listing.category]}`}>
                {categoryLabels[listing.category]}
              </span>
              <div className="flex items-center gap-0.5 text-xs text-gray-400">
                <Euro className="w-3 h-3" />
                <span>{listing.price}</span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
        </button>

        {/* Empty state */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            Starte die Unterhaltung
          </p>
          <p className="text-xs text-gray-400 max-w-[220px] leading-relaxed">
            Schreib {seller.name.split(' ')[0]} eine Nachricht oder wähle eine Vorlage unten.
          </p>

          <div className="mt-6 flex items-center gap-1.5 text-xs text-gray-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Nachrichten bleiben innerhalb von Duality</span>
          </div>
        </div>
      </div>

      {/* Bottom input area */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100">

        {/* Quick reply chips */}
        <div className="px-4 pt-2.5 pb-1 overflow-x-auto flex gap-2 no-scrollbar">
          {quickReplies.map((qr, i) => (
            <button
              key={i}
              onClick={() => setMessage(qr.text)}
              className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 bg-gray-50 hover:border-[#E10600]/40 hover:bg-[#E10600]/5 hover:text-[#E10600] transition-all text-xs text-gray-600 whitespace-nowrap"
            >
              <span>{qr.icon}</span>
              <span>{qr.label}</span>
            </button>
          ))}
        </div>

        {/* Textarea + Send */}
        <div className="flex items-end gap-2 px-4 pt-2 pb-4">
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder={`Nachricht an ${seller.name.split(' ')[0]}…`}
            rows={2}
            className="flex-1 resize-none bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#E10600]/25 focus:border-[#E10600]/40 transition-all leading-relaxed"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
              message.trim()
                ? 'bg-[#E10600] text-white hover:bg-red-700 shadow-sm shadow-[#E10600]/30'
                : 'bg-gray-100 text-gray-300 cursor-not-allowed'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
