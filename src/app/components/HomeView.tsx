import { useOutletContext, useNavigate } from 'react-router';
import { Calendar, Users, TrendingUp, User, Sparkles, MapPin, Heart, MessageCircle, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface UserProfile {
  name: string;
  major: string;
  phase: string;
  interests: string[];
}

interface OutletContext {
  userProfile: UserProfile;
}

export function HomeView() {
  const { userProfile } = useOutletContext<OutletContext>();
  const navigate = useNavigate();

  const isLoggedIn = userProfile && userProfile.name;

  const [tickerIndex, setTickerIndex] = useState(0);

  const tickerMessages = [
    '🎉 12 neue Matches für Phase B diese Woche',
    '🏠 3 WG-Zimmer in Jungbusch verfügbar',
    '💬 84 aktive Studierende online',
    '✨ 156 Events in diesem Monat',
    '🔥 Neue Marketplace-Angebote heute'
  ];

  const hotspots = [
    { name: 'Coblitzallee', x: '35%', y: '45%', active: true },
    { name: 'Jungbusch', x: '60%', y: '30%', active: false },
    { name: 'Neckarwiese', x: '75%', y: '60%', active: true }
  ];

  useEffect(() => {
    // Ticker rotation
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickerMessages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [tickerMessages.length]);

  return (
    <div className="h-full overflow-hidden bg-white relative">
      {/* Organic Background Glow Effects */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.08, 0.15, 0.08],
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 90, 0]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.05, 0.12, 0.05],
          x: [0, -60, 0],
          y: [0, 40, 0],
          rotate: [0, -120, 0]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute bottom-1/4 left-0 w-[450px] h-[450px] bg-zinc-800/15 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Scrollable Content - Hide Scrollbar */}
      <div className="h-full overflow-y-auto scrollbar-hide">
        <style>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>

        {/* Top Navigation - Mobile Only */}
        <div className="lg:hidden absolute top-0 right-0 z-50 px-6 pt-12 pb-4">
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(isLoggedIn ? '/settings' : '/login')}
              className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center border border-zinc-200"
            >
              {isLoggedIn ? (
                <div className="w-full h-full rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                  {userProfile.name[0]}
                </div>
              ) : (
                <User className="w-5 h-5 text-zinc-700" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Top Left Navigation - FAQ - Mobile Only */}
        <div className="lg:hidden absolute top-0 left-0 z-50 px-6 pt-12 pb-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/faq')}
            className="w-10 h-10 bg-zinc-100 rounded-full flex items-center justify-center border border-zinc-200"
          >
            <HelpCircle className="w-5 h-5 text-zinc-700" />
          </motion.button>
        </div>

        {/* Hero Section - Logo */}
        <div className="relative min-h-[40vh] lg:min-h-[30vh] flex items-center justify-center px-6 pt-20 lg:pt-12 pb-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{
              opacity: 1,
              scale: [1, 1.08, 1],
              rotate: [-2, 2, -2],
              y: [0, -15, 0]
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              },
              rotate: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              },
              y: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
            className="relative"
          >
            {/* Multi-layered Liquid Glow */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 -m-16 bg-gradient-to-br from-primary/30 via-transparent to-primary/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.3, 0.15],
                rotate: [360, 180, 0]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
              className="absolute inset-0 -m-12 bg-gradient-to-tr from-zinc-400/20 via-transparent to-zinc-600/20 rounded-full blur-2xl"
            />

            <img
              src="/src/imports/ChatGPT_Image_28._Apr._2026,_10_11_33.png"
              alt="Project Connect Logo"
              className="h-32 lg:h-40 w-auto relative z-10 drop-shadow-2xl"
            />
          </motion.div>
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center px-6 pb-12"
        >
          <h1 className="text-4xl font-bold text-foreground mb-4 leading-tight">
            Dein Campus.<br />Dein Marktplatz.
          </h1>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Vernetzt in den Quadraten. Sicher mit deiner DHBW-Mail.
          </p>

          {!isLoggedIn && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/login')}
              className="mt-8 bg-primary text-white px-10 py-4 rounded-full font-medium shadow-lg shadow-primary/30"
            >
              Jetzt beitreten
            </motion.button>
          )}
        </motion.div>

        {/* Dynamic Ticker - Social Proof */}
        <div className="relative overflow-hidden py-6">
          <motion.div
            key={tickerIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block bg-zinc-100/80 backdrop-blur-xl border border-zinc-200 rounded-full px-6 py-3">
              <p className="text-foreground text-sm font-medium">
                {tickerMessages[tickerIndex]}
              </p>
            </div>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <div className="px-6 lg:px-12 py-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => navigate('/faq')}
            className="text-2xl lg:text-3xl font-bold text-foreground mb-6 text-center cursor-pointer hover:text-primary transition-colors"
          >
            Häufige Fragen
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-6xl mx-auto">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/faq')}
              className="w-full bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-2xl p-5 text-left hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-foreground mb-1">Wie funktioniert Phase-Share?</h3>
              <p className="text-sm text-muted-foreground">Finde WG-Partner die genau dann da sind, wenn du nicht da bist.</p>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/faq')}
              className="w-full bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-2xl p-5 text-left hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-foreground mb-1">Ist meine DHBW-Mail sicher?</h3>
              <p className="text-sm text-muted-foreground">Ja, nur verifizierte Studierende haben Zugriff.</p>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate('/faq')}
              className="w-full bg-white/80 backdrop-blur-sm border border-zinc-200 rounded-2xl p-5 text-left hover:border-primary/40 hover:shadow-lg transition-all"
            >
              <h3 className="font-semibold text-foreground mb-1">Wie erstelle ich ein Event?</h3>
              <p className="text-sm text-muted-foreground">Gehe zu Events und tippe auf das Plus-Symbol.</p>
            </motion.button>
          </div>
        </div>

        {/* Spacer for Map */}
        <div className="h-20"></div>

        {/* Integrated Map - Fades in from bottom */}
        <motion.div
          onClick={() => navigate('/map')}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative h-[50vh] lg:h-[60vh] cursor-pointer"
        >
          {/* Soft Fade Gradient Overlay */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>

          {/* Click Hint */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute top-8 left-1/2 -translate-x-1/2 z-20 bg-primary text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
          >
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-medium">Karte erkunden</span>
          </motion.div>

          {/* Map Container */}
          <div className="relative h-full bg-zinc-50/80 backdrop-blur-sm">
            {/* Map Grid Pattern */}
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }}
            ></div>

            {/* Hotspot Markers */}
            {hotspots.map((spot, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.2 + i * 0.2, type: "spring" }}
                className="absolute"
                style={{ left: spot.x, top: spot.y }}
              >
                <div className="relative">
                  {/* Pulse Effect */}
                  {spot.active && (
                    <motion.div
                      animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 -m-2 bg-primary rounded-full"
                    />
                  )}

                  <div className={`w-4 h-4 rounded-full ${spot.active ? 'bg-primary' : 'bg-zinc-400'} border-2 border-white shadow-lg`} />

                  {/* Label */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <p className="text-foreground text-xs font-medium bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full border border-zinc-200 shadow-sm">
                      {spot.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Map Legend */}
            <div className="absolute bottom-6 left-6">
              <div className="bg-white/90 backdrop-blur-xl border border-zinc-200 rounded-2xl p-4 shadow-lg">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <p className="text-foreground text-xs font-medium">Aktive Events</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-zinc-400 rounded-full"></div>
                  <p className="text-muted-foreground text-xs">Stadtteile</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Padding for Navigation */}
        <div className="h-24 lg:h-12"></div>
      </div>
    </div>
  );
}