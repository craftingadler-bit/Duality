import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, Home, FileText, HelpCircle, Wallet, ChevronDown, MessageCircle } from 'lucide-react';

export function FAQView() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const categories = [
    {
      id: 'housing',
      name: 'Wohnen & Housing',
      icon: Home,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      id: 'exams',
      name: 'Prüfungsamt',
      icon: FileText,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      id: 'support',
      name: 'App-Support',
      icon: HelpCircle,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      id: 'finance',
      name: 'Finanzen',
      icon: Wallet,
      color: 'bg-orange-50 text-orange-600 border-orange-200'
    }
  ];

  const faqs = [
    {
      id: 0,
      question: 'Wie funktioniert das Phasen-Matching?',
      answer: 'Das Phasen-Matching verbindet Studierende mit komplementären Studienphasen. Wenn du in der A-Phase bist (Theorie), wirst du mit B-Phase-Studierenden (Praxis) gematcht, die genau dann ein Zimmer brauchen, wenn du im Unternehmen bist. So könnt ihr euch eine Wohnung teilen und beide sparen Geld!'
    },
    {
      id: 1,
      question: 'Ist die App nur für DHBW Mannheim?',
      answer: 'Aktuell ist die App optimiert für DHBW Mannheim, aber wir planen die Expansion auf andere DHBW Standorte. Bleib dran!'
    },
    {
      id: 2,
      question: 'Wie funktioniert der Digital Asset-Safe?',
      answer: 'Der Asset-Safe schützt deine digitalen Dateien (PDFs, Skripte, etc.). Käufer können die Datei erst nach Zahlungsbestätigung herunterladen. So bist du als Verkäufer geschützt.'
    },
    {
      id: 3,
      question: 'Sind die Inserate kostenlos?',
      answer: 'Ja, alle Studierenden können kostenlos inserieren. Duality ist eine Non-Profit-Plattform für die DHBW Community.'
    },
    {
      id: 4,
      question: 'Wie verifiziere ich meine DHBW-Email?',
      answer: 'Nach der Registrierung senden wir dir eine Bestätigungsmail an deine @student.dhbw-mannheim.de Adresse. Klicke auf den Link in der Email und dein Account wird freigeschaltet.'
    },
    {
      id: 5,
      question: 'Was ist der Unterschied zwischen den Kategorien?',
      answer: 'SERVICE (Blau): Dienstleistungen wie Nachhilfe. PHYSICAL (Orange): Physische Gegenstände wie Bücher oder Möbel. DIGITAL (Violett): Digitale Produkte mit Asset-Safe Schutz.'
    },
    {
      id: 6,
      question: 'Wie kann ich einen Tutor buchen?',
      answer: 'Gehe auf die SERVICE-Kategorie im Marketplace, wähle einen Tutor und sieh dir seine verfügbaren Zeitslots an. Kontaktiere ihn direkt über den Chat, um einen Termin zu vereinbaren.'
    },
    {
      id: 7,
      question: 'Ist meine Zahlung sicher?',
      answer: 'Alle Transaktionen werden über sichere Zahlungsanbieter abgewickelt. Wir speichern keine Kreditkartendaten. Digital Assets werden erst nach Zahlungsbestätigung freigegeben.'
    }
  ];

  const toggleFaq = (id: number) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-12 pb-4 bg-white border-b border-border">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/')}
            className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="text-2xl text-foreground">Help Center</h2>
            <p className="text-sm text-muted-foreground">Wir helfen dir weiter</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Was suchst du?"
            className="w-full pl-12 pr-4 py-4 bg-input-background rounded-2xl border border-border focus:border-primary outline-none transition-colors text-foreground placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Category Grid */}
        <div className="px-6 py-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Kategorien</h3>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  className={`p-5 rounded-2xl border ${category.color} hover:scale-[1.02] transition-transform text-left`}
                >
                  <Icon className="w-8 h-8 mb-3" />
                  <p className="font-medium text-sm leading-tight">{category.name}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="px-6 pb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-4">Häufig gestellte Fragen</h3>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-border overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-secondary transition-colors"
                >
                  <span className="font-medium text-foreground pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${
                      expandedFaq === faq.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-5 pb-4 pt-2 border-t border-border">
                    <p className="text-sm text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="px-6 pb-8">
          <div className="bg-gradient-to-r from-primary to-red-600 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">Nicht gefunden?</h4>
                <p className="text-sm text-white/90 mb-4">Frag die Community</p>
                <button className="bg-white text-primary px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors text-sm font-medium">
                  Community Forum
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
