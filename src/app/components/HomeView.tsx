import { useOutletContext, useNavigate } from "react-router";
import {
  Sparkles,
  User,
  HelpCircle,
  Trophy,
  Target,
  Flame,
  Quote,
  Timer,
  ChevronRight,
  Rocket,
  Coffee,
  Headphones,
  Landmark,
  Brain,
  Map,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

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

  const [quoteIndex, setQuoteIndex] = useState(0);

  const motivationalQuotes = [
    {
      text: "Der beste Weg, die Zukunft vorherzusagen, ist, sie zu erschaffen.",
      author: "Peter Drucker",
    },
    {
      text: "Einfachheit ist die höchste Stufe der Vollendung.",
      author: "Leonardo da Vinci",
    },
    {
      text: "Deine einzige Grenze ist dein eigener Verstand.",
      author: "Anonym",
    },
    {
      text: "In den Quadraten werden Visionen zu Realität.",
      author: "Mannheim Vibes",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex(
        (prev) => (prev + 1) % motivationalQuotes.length,
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const semesterProgress = 65;

  return (
    <div className="h-full overflow-hidden bg-[#fafafa] text-foreground relative selection:bg-primary/20">
      {/* --- BACKGROUND --- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-[10%] -right-[10%] w-[70%] h-[60%] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-[20%] -left-[10%] w-[60%] h-[50%] bg-gradient-to-tr from-zinc-200/50 to-transparent rounded-full blur-[100px]"
        />
      </div>

      <div className="h-full overflow-y-auto scrollbar-hide relative z-10 px-6 py-6 lg:px-12">
        <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>

        {/* --- HEADER --- */}
        <header className="flex justify-between items-center mb-8 sticky top-0 z-50 pt-6 pb-4">
          <motion.button
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate("/faq")}
            className="w-12 h-12 bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center border border-border shadow-sm transition-all hover:shadow-md"
          >
            <HelpCircle className="w-6 h-6 text-zinc-600" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate(isLoggedIn ? "/settings" : "/login")
            }
            className="p-1 bg-white/70 backdrop-blur-md rounded-2xl border border-border shadow-sm flex items-center gap-2 group"
          >
            {isLoggedIn ? (
              <>
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold shadow-inner">
                  {userProfile.name[0]}
                </div>
                <span className="pr-3 text-sm font-semibold text-zinc-700 hidden sm:block">
                  Mein Profil
                </span>
              </>
            ) : (
              <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-600 group-hover:bg-zinc-200 transition-colors">
                <User className="w-5 h-5" />
              </div>
            )}
          </motion.button>
        </header>

        <main className="max-w-5xl mx-auto space-y-10 pb-24">
          {/* Hero */}
          <section className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative mb-8 group flex justify-center w-full" // w-full hinzugefügt für stabilere Zentrierung
            >
              <div className="absolute inset-0 bg-primary/10 blur-[50px] rounded-full scale-150 transition-all duration-700" />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative z-10" // z-index hierhin verschoben
              >
                <img
                  src="/logo.png"
                  
                  // ÄNDERUNGEN HIER: object-contain und max-w-full hinzugefügt
                  className="h-64 lg:h-80 w-auto max-w-full object-contain drop-shadow-xl"
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-200 text-primary text-xs font-bold uppercase tracking-widest shadow-sm mb-6"
            >
              <Sparkles className="w-3.5 h-3.5" /> Start in den
              Tag
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight text-zinc-900"
            >
              FOKUS AUF DAS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-500">
                WESENTLICHE.
              </span>
            </motion.h1>
          </section>

          {/* --- BENTO GRID --- */}
          {/* grid-cols-2 sorgt dafür, dass wir auf Mobile zwei Spalten nutzen können */}
          <section className="grid grid-cols-2 md:grid-cols-12 gap-4 lg:gap-6">
            {/* Quote - Volle Breite auf Mobile */}
            <motion.div
              whileHover={{ y: -5 }}
              className="col-span-2 md:col-span-8 bg-white border border-zinc-100 rounded-[2rem] lg:rounded-[2.5rem] p-8 lg:p-10 flex flex-col justify-between min-h-[250px] lg:min-h-[300px] relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500"
            >
              <Quote className="absolute -top-4 -right-4 w-24 h-24 lg:w-32 lg:h-32 text-zinc-50 rotate-12 group-hover:text-primary/5 transition-colors duration-500" />
              <div className="bg-primary/10 w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
                <Target className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={quoteIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-xl lg:text-3xl font-bold leading-tight mb-3 text-zinc-800">
                    "{motivationalQuotes[quoteIndex].text}"
                  </h2>
                  <p className="text-sm lg:text-base text-zinc-500 font-medium">
                    — {motivationalQuotes[quoteIndex].author}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            {/* Semester Progress - 1 Spalte auf Mobile (sitzt neben Balance) */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 md:col-span-4 bg-zinc-900 text-white rounded-[2rem] lg:rounded-[2.5rem] p-5 lg:p-8 shadow-lg flex flex-col justify-between aspect-square md:aspect-auto"
            >
              <div className="flex justify-between items-center mb-4 lg:mb-0">
                <Timer className="text-zinc-400 w-5 h-5 lg:w-6 lg:h-6" />
                <span className="hidden sm:block text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Semester
                </span>
              </div>
              <div className="space-y-2 lg:space-y-4">
                <div className="text-3xl lg:text-5xl font-black">
                  {semesterProgress}%
                </div>
                <div className="h-2 lg:h-3 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${semesterProgress}%` }}
                    transition={{
                      duration: 1.5,
                      ease: "easeOut",
                      delay: 0.5,
                    }}
                    className="h-full bg-primary"
                  />
                </div>
                <p className="hidden lg:block text-sm text-zinc-400 font-medium">
                  Das Semester ist im vollen Gange. Bleib dran!
                </p>
              </div>
            </motion.div>

            {/* Balance - 1 Spalte auf Mobile (sitzt neben Semester) */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="col-span-1 md:col-span-5 bg-gradient-to-br from-rose-400 to-primary rounded-[2rem] lg:rounded-[2.5rem] p-5 lg:p-8 text-white flex flex-col justify-between shadow-lg shadow-primary/20 aspect-square md:aspect-auto"
            >
              <div className="flex justify-between items-start mb-2 lg:mb-6">
                <Flame className="w-6 h-6 lg:w-8 lg:h-8 text-white/90 animate-pulse" />
                <span className="hidden lg:block bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                  Balance
                </span>
              </div>
              <div>
                <h3 className="text-lg lg:text-2xl font-bold leading-tight mb-1 lg:mb-2">
                  Take a breath
                </h3>
                <p className="text-white/90 text-xs lg:text-sm font-medium line-clamp-3 lg:line-clamp-none">
                  15 Min am Neckar bewirken mehr als 2h stures
                  Starren.
                </p>
              </div>
            </motion.div>

            {/* Challenge - Volle Breite */}
            <motion.div
              whileHover={{ y: -5 }}
              className="col-span-2 md:col-span-7 bg-white border border-zinc-100 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col justify-between"
            >
              <div className="space-y-2 mb-6">
                <p className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <Rocket className="w-4 h-4" /> Weekly
                  Challenge
                </p>
                <h4 className="text-xl lg:text-2xl font-bold text-zinc-800">
                  Verlasse deine Bubble.
                </h4>
                <p className="text-sm text-zinc-500 font-medium max-w-sm">
                  Sprich diese Woche jemanden aus einem anderen
                  Kurs an. Ein kurzes "Hey" reicht.
                </p>
              </div>
              <div className="w-full bg-zinc-50 rounded-xl p-4 border border-zinc-100 flex items-center justify-between group cursor-pointer hover:border-primary/30 transition-colors">
                <span className="text-sm font-bold text-zinc-600 group-hover:text-primary transition-colors">
                  Challenge annehmen
                </span>
                <ChevronRight className="w-5 h-5 text-zinc-400 group-hover:text-primary transition-colors" />
              </div>
            </motion.div>

            {/* --- HORIZONTAL SCROLL AUF MOBILE --- */}
            {/* Bricht das Grid auf dem Handy für eine wischbare Reihe auf */}
            <div className="col-span-2 md:col-span-12 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-6 px-6 md:mx-0 md:px-0 gap-4 md:grid md:grid-cols-12 lg:gap-6 pb-2 md:pb-0">
              {/* Pomodoro */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="w-[85vw] md:w-auto shrink-0 snap-center md:col-span-4 bg-zinc-900 text-white rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 shadow-lg flex flex-col justify-between relative overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <Brain className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                    <Timer className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Pomodoro Methode
                  </h3>
                  <p className="text-sm text-zinc-400 font-medium">
                    25 Min Fokus, 5 Min Pause. Wiederhole das 4
                    Mal.
                  </p>
                </div>
              </motion.div>

              {/* Deep Work */}
              <motion.div
                whileHover={{ y: -5 }}
                className="w-[85vw] md:w-auto shrink-0 snap-center md:col-span-4 bg-white border border-zinc-100 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 shadow-sm flex flex-col justify-center gap-4"
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-100">
                  <Headphones className="w-6 h-6 lg:w-7 lg:h-7 text-zinc-800" />
                </div>
                <div>
                  <p className="text-zinc-400 font-bold text-xs uppercase tracking-widest mb-1">
                    Deep Work
                  </p>
                  <h4 className="text-lg font-bold text-zinc-800 mb-1">
                    Lofi Beats
                  </h4>
                  <p className="text-sm text-zinc-500 font-medium">
                    Perfekt für die DHBW Bibliothek.
                  </p>
                </div>
              </motion.div>

              {/* Fact */}
              <motion.div
                whileHover={{ y: -5 }}
                className="w-[85vw] md:w-auto shrink-0 snap-center md:col-span-4 bg-white border border-zinc-100 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 shadow-sm flex flex-col justify-center gap-4"
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 shrink-0 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Landmark className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
                </div>
                <div>
                  <p className="text-primary font-bold text-xs uppercase tracking-widest mb-1">
                    Quadrate Fact
                  </p>
                  <h4 className="text-lg font-bold text-zinc-800 mb-1">
                    Wusstest du?
                  </h4>
                  <p className="text-sm text-zinc-500 font-medium">
                    Mannheim wurde 1606 als Planstadt angelegt.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Coffee - Volle Breite */}
            <motion.div
              whileHover={{ y: -5 }}
              className="col-span-2 md:col-span-12 bg-white border border-zinc-100 rounded-[2rem] lg:rounded-[2.5rem] p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <p className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                  <Coffee className="w-4 h-4" /> Local Guide
                </p>
                <h4 className="text-xl lg:text-2xl font-bold text-zinc-800">
                  Brauchst du Koffein?
                </h4>
                <p className="text-sm text-zinc-500 font-medium max-w-sm">
                  Hol dir einen Flat White im{" "}
                  <span className="text-zinc-800 font-bold">
                    Café Prag
                  </span>{" "}
                  in E4. Nur 10 Minuten entfernt.
                </p>
              </div>
              <div className="w-full sm:w-32 h-32 shrink-0 rounded-2xl bg-zinc-100 overflow-hidden shadow-inner">
                <img
                  src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=400&q=80"
                  alt="Coffee"
                  className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                />
              </div>
            </motion.div>

            {/* --- EDGE-TO-EDGE AUF MOBILE --- */}
            {/* -mx-6 entfernt die weißen Ränder auf dem Handy, rounded-none macht es bündig */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="col-span-2 md:col-span-12 -mx-6 md:mx-0 rounded-none md:rounded-[2.5rem] relative overflow-hidden bg-zinc-900 p-8 lg:p-12 shadow-xl group cursor-pointer mt-4 md:mt-0"
            >
              <div className="absolute inset-0 opacity-40 group-hover:opacity-50 transition-opacity duration-700">
                <img
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80"
                  alt="Mannheim Evening"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-900 via-zinc-900/80 to-transparent" />
              </div>
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <p className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 mb-2">
                    <Moon className="w-4 h-4" /> After Study
                  </p>
                  <h3 className="text-3xl font-black text-white mb-2">
                    Feierabend im Jungbusch.
                  </h3>
                  <p className="text-zinc-300 font-medium max-w-md">
                    Klapp den Laptop zu. Die Bars füllen sich
                    langsam. Zeit für den Ausgleich.
                  </p>
                </div>
                <button
                  onClick={() => navigate("/map")}
                  className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-full text-white font-bold text-sm flex items-center gap-2 group-hover:bg-white group-hover:text-black transition-colors w-max mt-4 sm:mt-0"
                >
                  Map öffnen <Map className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
}