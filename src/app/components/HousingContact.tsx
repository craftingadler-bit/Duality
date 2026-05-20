import { useParams, useNavigate } from 'react-router';
import {
  ArrowLeft,
  CheckCircle,
  Star,
  Send,
  Home,
  Euro,
  ChevronRight,
  MessageCircle,
  Shield,
} from 'lucide-react';
import { useState } from 'react';

const listings = [
  { id: 1, title: "Cozy Room in Lindenhof", price: 450, location: "Lindenhof", availablePhase: "B-Phase", roommate: { name: "Lisa M.", age: 21, major: "Business Administration", semester: 3, phase: "A-Phase", verified: true, rating: 4.9, reviews: 12 } },
  { id: 2, title: "Modern Apartment Share", price: 520, location: "Neckarstadt", availablePhase: "A-Phase", roommate: { name: "Tom K.", age: 23, major: "Computer Science", semester: 5, phase: "B-Phase", verified: true, rating: 4.8, reviews: 15 } },
  { id: 4, title: "Artist Loft Room", price: 400, location: "Jungbusch", availablePhase: "B-Phase", roommate: { name: "Marc U.", age: 22, major: "Digital Media", semester: 4, phase: "A-Phase", verified: true, rating: 4.7, reviews: 6 } },
  { id: 6, title: "Bright Room in WG", price: 480, location: "Schwetzingerstadt", availablePhase: "A-Phase", roommate: { name: "Sarah B.", age: 20, major: "Economics", semester: 2, phase: "B-Phase", verified: true, rating: 4.9, reviews: 4 } },
  { id: 7, title: "Industrial Style WG", price: 430, location: "Neckarstadt", availablePhase: "B-Phase", roommate: { name: "Kevin S.", age: 24, major: "Engineering", semester: 6, phase: "A-Phase", verified: true, rating: 4.5, reviews: 9 } },
  { id: 8, title: "Lake View Room", price: 460, location: "Neckarau", availablePhase: "A-Phase", roommate: { name: "Julia F.", age: 22, major: "Health Management", semester: 4, phase: "B-Phase", verified: true, rating: 4.8, reviews: 7 } },
  { id: 10, title: "Budget Student Room", price: 350, location: "Käfertal", availablePhase: "B-Phase", roommate: { name: "Nils W.", age: 21, major: "Logistics", semester: 3, phase: "A-Phase", verified: true, rating: 4.6, reviews: 5 } },
  { id: 11, title: "Minimalist Room Almenhof", price: 440, location: "Almenhof", availablePhase: "A-Phase", roommate: { name: "Sophie H.", age: 20, major: "International Business", semester: 2, phase: "B-Phase", verified: true, rating: 5.0, reviews: 3 } },
  { id: 13, title: "DHBW Campus WG", price: 500, location: "Neuostheim", availablePhase: "B-Phase", roommate: { name: "Erik T.", age: 22, major: "Mechanical Engineering", semester: 4, phase: "A-Phase", verified: true, rating: 4.5, reviews: 8 } },
  { id: 14, title: "Charming Attic Room", price: 390, location: "Wohlgelegen", availablePhase: "A-Phase", roommate: { name: "Mia P.", age: 20, major: "Social Work", semester: 2, phase: "B-Phase", verified: true, rating: 4.7, reviews: 5 } },
];

const quickReplies = [
  { icon: "👋", label: "Vorstellung", text: "Hallo! Ich bin DHBW-Student und auf der Suche nach einem Zimmer für meine Phase. Dein Inserat klingt super – können wir uns kurz austauschen?" },
  { icon: "🏠", label: "Besichtigung", text: "Hi! Ich würde das Zimmer sehr gerne besichtigen. Wärst du diese oder nächste Woche für einen kurzen Rundgang verfügbar?" },
  { icon: "📅", label: "Phasen", text: "Hey! Deine Phase und meine passen perfekt zusammen. Ich könnte das Zimmer genau während deiner Abwesenheit nutzen. Sollen wir die Details klären?" },
  { icon: "💶", label: "Kosten", text: "Hallo! Ich interessiere mich für dein Zimmer. Sind im Preis alle Nebenkosten enthalten, oder kommen noch weitere Kosten hinzu?" },
  { icon: "☕", label: "Kennenlernen", text: "Hi! Bevor wir uns entscheiden, würde ich gerne kurz bei einem Kaffee auf dem Campus vorstellig werden – passt dir das?" },
  { icon: "✅", label: "Interesse", text: "Ich habe dein Inserat genau gelesen und bin sehr interessiert! Kannst du mir die nächsten Schritte erklären?" },
];

export function HousingContact() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === Number(id));

  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  if (!listing || !listing.roommate) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-2">Kontaktperson nicht gefunden</h2>
          <button onClick={() => navigate('/housing')} className="text-[#E10600]">
            Zurück zu Housing
          </button>
        </div>
      </div>
    );
  }

  const { roommate } = listing;

  function handleSend() {
    if (!message.trim()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-white px-6 text-center">
        <div className="w-20 h-20 bg-[#E10600]/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle className="w-10 h-10 text-[#E10600]" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Nachricht gesendet!</h2>
        <p className="text-gray-500 text-sm mb-2">
          Deine Nachricht wurde erfolgreich an{' '}
          <span className="font-medium text-gray-800">{roommate.name}</span> gesendet.
        </p>
        <p className="text-gray-400 text-xs mb-8">
          Du erhältst eine Benachrichtigung, sobald {roommate.name.split(' ')[0]} antwortet.
        </p>

        <div className="w-full max-w-sm bg-[#E10600]/5 border border-[#E10600]/20 rounded-2xl p-4 mb-8 text-left">
          <p className="text-xs text-[#E10600] font-medium mb-2 flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" /> Deine Nachricht
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
        </div>

        <div className="flex flex-col gap-3 w-full max-w-sm">
          <button
            onClick={() => navigate(`/housing/${id}`)}
            className="w-full py-3 rounded-xl border-2 border-[#E10600] text-[#E10600] font-medium text-sm hover:bg-[#E10600]/5 transition-colors"
          >
            Zurück zum Inserat
          </button>
          <button
            onClick={() => navigate('/housing')}
            className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-medium text-sm hover:bg-gray-200 transition-colors"
          >
            Alle Inserate ansehen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">

      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/housing/${id}`)}
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-[#E10600] rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0 text-base">
              {roommate.name[0]}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-gray-900 text-sm truncate">{roommate.name}</span>
                {roommate.verified && (
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span>{roommate.rating}</span>
                <span>·</span>
                <span>{roommate.major}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-5 flex flex-col gap-4">

        {/* Listing reference card */}
        <button
          onClick={() => navigate(`/housing/${id}`)}
          className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl p-3 hover:bg-gray-100 transition-colors text-left w-full"
        >
          <div className="w-9 h-9 bg-[#E10600]/10 rounded-xl flex items-center justify-center flex-shrink-0">
            <Home className="w-4 h-4 text-[#E10600]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 mb-0.5">Anfrage bezüglich</p>
            <p className="text-sm font-medium text-gray-900 truncate">{listing.title}</p>
            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
              <span>{listing.location}</span>
              <span>·</span>
              <div className="flex items-center gap-0.5">
                <Euro className="w-3 h-3" />
                <span>{listing.price}/Monat</span>
              </div>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-gray-300 flex-shrink-0" />
        </button>

        {/* Empty state hint */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
          <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-gray-400" />
          </div>
          <p className="text-sm font-medium text-gray-700 mb-1">
            Starte die Unterhaltung
          </p>
          <p className="text-xs text-gray-400 max-w-[220px] leading-relaxed">
            Schreib {roommate.name.split(' ')[0]} eine Nachricht oder wähle eine Vorlage unten.
          </p>

          {/* Trust badge */}
          <div className="mt-6 flex items-center gap-1.5 text-xs text-gray-400">
            <Shield className="w-3.5 h-3.5" />
            <span>Nachrichten bleiben innerhalb von Duality</span>
          </div>
        </div>
      </div>

      {/* Bottom input area */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100">

        {/* Quick reply chips – dezent, horizontal scrollbar */}
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
            placeholder={`Nachricht an ${roommate.name.split(' ')[0]}…`}
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
