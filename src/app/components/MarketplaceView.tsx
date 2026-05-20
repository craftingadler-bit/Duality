import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  Plus,
  Euro,
  MapPin,
  Heart,
  Sparkles,
  SlidersHorizontal,
  Clock,
  Package,
  GraduationCap,
  Laptop,
  Tag,
} from "lucide-react";

type ListingCategory = "SERVICE" | "PHYSICAL" | "DIGITAL";

interface Listing {
  id: number;
  title: string;
  price: number;
  category: ListingCategory;
  subcategory: string;
  seller: string;
  location: string;
  image: string;
  condition?: string;
  postedTime: string;
  description: string;
  isDigital?: boolean;
}

export function MarketplaceView() {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<
    "all" | ListingCategory
  >("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState<number>(300);
  const [selectedLoc, setSelectedLoc] = useState("Alle");

  const locations = [
    "Alle",
    "Quadrate",
    "Jungbusch",
    "Neckarstadt",
    "Lindenhof",
    "Oststadt",
    "Neckarau",
    "Campus",
  ];

  useEffect(() => {
    const allMockListings: Listing[] = [
      {
        id: 1,
        title: "BWL Skript - Zusammenfassung",
        price: 15,
        category: "DIGITAL",
        subcategory: "Study",
        seller: "Lisa M.",
        location: "Campus",
        image:
          "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
        postedTime: "2h ago",
        description: "Complete summary",
        isDigital: true,
        condition: "Digital",
      },
      {
        id: 2,
        title: "Tutoring: Mathematik 1",
        price: 25,
        category: "SERVICE",
        subcategory: "Tutoring",
        seller: "Tom K.",
        location: "Online",
        image:
          "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400",
        postedTime: "5h ago",
        description: "Math 1 Tutor",
      },
      {
        id: 3,
        title: "IKEA Desk & Chair Set",
        price: 80,
        category: "PHYSICAL",
        subcategory: "Furniture",
        seller: "Anna S.",
        location: "Lindenhof",
        image:
          "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400",
        condition: "Gut",
        postedTime: "1d ago",
        description: "Desk setup",
      },
      {
        id: 4,
        title: "Programmieren Nachhilfe",
        price: 30,
        category: "SERVICE",
        subcategory: "Tutoring",
        seller: "Max K.",
        location: "Neckarstadt",
        image:
          "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400",
        postedTime: "1d ago",
        description: "Java/Python",
      },
      {
        id: 5,
        title: "Informatik Altklausuren",
        price: 10,
        category: "DIGITAL",
        subcategory: "Exam Prep",
        seller: "Felix W.",
        location: "Campus",
        image:
          "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400",
        postedTime: "2d ago",
        description: "PDF format",
        isDigital: true,
        condition: "Digital",
      },
      {
        id: 6,
        title: "City Bike - 21 Speed",
        price: 120,
        category: "PHYSICAL",
        subcategory: "Bikes",
        seller: "Sarah L.",
        location: "Jungbusch",
        image:
          "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400",
        condition: "Wie Neu",
        postedTime: "3d ago",
        description: "With lock",
      },
      {
        id: 8,
        title: "Air Fryer (Philips)",
        price: 45,
        category: "PHYSICAL",
        subcategory: "Kitchen",
        seller: "Julia B.",
        location: "Quadrate",
        image:
          "https://images.unsplash.com/photo-1626074353765-517a681e40be?w=400",
        condition: "Gut",
        postedTime: "4h ago",
        description: "Hardly used",
      },
      {
        id: 9,
        title: "Proofreading Thesis",
        price: 40,
        category: "SERVICE",
        subcategory: "Writing",
        seller: "Elena R.",
        location: "Online",
        image:
          "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
        postedTime: "12h ago",
        description: "Grammar check",
      },
      {
        id: 10,
        title: "Microeconomics Notes",
        price: 12,
        category: "DIGITAL",
        subcategory: "Study",
        seller: "Kevin P.",
        location: "Campus",
        image:
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
        postedTime: "1d ago",
        description: "Annotated slides",
        isDigital: true,
        condition: "Digital",
      },
      {
        id: 12,
        title: "Grocery Help",
        price: 10,
        category: "SERVICE",
        subcategory: "Errands",
        seller: "Lukas T.",
        location: "Quadrate",
        image:
          "https://images.unsplash.com/photo-1506484381205-f7945653044d?w=400",
        postedTime: "2d ago",
        description: "Shopping help",
      },
      {
        id: 13,
        title: "Yoga Mat (Manduka)",
        price: 20,
        category: "PHYSICAL",
        subcategory: "Sports",
        seller: "Sophia G.",
        location: "Neckarau",
        image:
          "https://images.unsplash.com/photo-1592419044706-39796d40f98c?w=400",
        condition: "Wie Neu",
        postedTime: "2d ago",
        description: "Non-slip",
      },
      {
        id: 14,
        title: "Python Template",
        price: 20,
        category: "DIGITAL",
        subcategory: "Programming",
        seller: "Chris D.",
        location: "Online",
        image:
          "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400",
        postedTime: "3d ago",
        description: "Data analysis",
        isDigital: true,
        condition: "Digital",
      },
      {
        id: 15,
        title: "Moving Help",
        price: 50,
        category: "SERVICE",
        subcategory: "Labor",
        seller: "Basti L.",
        location: "Mannheim",
        image:
          "https://images.unsplash.com/photo-1520038410233-7141be7e6f97?w=400",
        postedTime: "3d ago",
        description: "Carry boxes",
      },
      {
        id: 16,
        title: "Dell 24 Zoll Monitor",
        price: 55,
        category: "PHYSICAL",
        subcategory: "Electronics",
        seller: "Jonas H.",
        location: "Quadrate",
        image:
          "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400",
        condition: "Gut",
        postedTime: "1h ago",
        description: "Full HD",
      },
      {
        id: 17,
        title: "Nespresso Maschine",
        price: 25,
        category: "PHYSICAL",
        subcategory: "Kitchen",
        seller: "Lara P.",
        location: "Jungbusch",
        image:
          "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400",
        condition: "Wie Neu",
        postedTime: "3h ago",
        description: "Capsule machine",
      },
      {
        id: 18,
        title: "Monstera Pflanze",
        price: 20,
        category: "PHYSICAL",
        subcategory: "Home",
        seller: "Mila K.",
        location: "Neckarstadt",
        image:
          "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400",
        condition: "Neu",
        postedTime: "5h ago",
        description: "With pot",
      },
      {
        id: 19,
        title: "Samsung Mikrowelle",
        price: 35,
        category: "PHYSICAL",
        subcategory: "Kitchen",
        seller: "Kevin R.",
        location: "Lindenhof",
        image:
          "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078?w=400",
        condition: "Gebraucht",
        postedTime: "12h ago",
        description: "800W",
      },
      {
        id: 21,
        title: "Mathe Lehrbuch",
        price: 12,
        category: "PHYSICAL",
        subcategory: "Books",
        seller: "Sarah G.",
        location: "Campus",
        image:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400",
        condition: "Gebraucht",
        postedTime: "1d ago",
        description: "Computer science math",
      },
      {
        id: 23,
        title: "Vintage DHBW Hoodie",
        price: 18,
        category: "PHYSICAL",
        subcategory: "Clothing",
        seller: "Basti W.",
        location: "Oststadt",
        image:
          "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400",
        condition: "Gut",
        postedTime: "2d ago",
        description: "Size XL",
      },
      {
        id: 24,
        title: "Mini-Kühlschrank",
        price: 40,
        category: "PHYSICAL",
        subcategory: "Electronics",
        seller: "Erik M.",
        location: "Jungbusch",
        image:
          "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400",
        condition: "Gut",
        postedTime: "3d ago",
        description: "For drinks",
      },
    ];
    setListings(allMockListings);
  }, []);

  const categories = [
    {
      id: "all" as const,
      label: "Alle",
      color: "bg-zinc-900",
      icon: <Tag className="w-4 h-4" />,
    },
    {
      id: "PHYSICAL" as const,
      label: "Physisch",
      color: "bg-orange-500",
      icon: <Package className="w-4 h-4" />,
    },
    {
      id: "SERVICE" as const,
      label: "Services",
      color: "bg-blue-500",
      icon: <GraduationCap className="w-4 h-4" />,
    },
    {
      id: "DIGITAL" as const,
      label: "Digital",
      color: "bg-purple-600",
      icon: <Laptop className="w-4 h-4" />,
    },
  ];

  const filteredListings = listings.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" ||
      item.category === selectedCategory;
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPrice = item.price <= maxPrice;
    const matchesLoc =
      selectedLoc === "Alle" || item.location === selectedLoc;
    return (
      matchesCategory &&
      matchesSearch &&
      matchesPrice &&
      matchesLoc
    );
  });

  const getCategoryTheme = (category: ListingCategory) => {
    switch (category) {
      case "DIGITAL":
        return {
          bg: "bg-purple-600",
          text: "text-white",
          border: "border-purple-700",
          accent: "text-purple-600",
        };
      case "SERVICE":
        return {
          bg: "bg-blue-50",
          text: "text-blue-600",
          border: "border-blue-200",
          accent: "text-blue-600",
        };
      default:
        return {
          bg: "bg-orange-50",
          text: "text-orange-600",
          border: "border-orange-200",
          accent: "text-orange-600",
        };
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F9FAFB] font-sans">
      {/* Header & Sticky Filter */}
      <div className="px-6 pt-12 pb-6 bg-white border-b border-zinc-100 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-black text-zinc-900 tracking-tight">
            Marketplace
          </h2>
          <button
            onClick={() => navigate("/marketplace/create")}
            className="w-12 h-12 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-95 transition-transform"
          >
            <Plus className="w-7 h-7" />
          </button>
        </div>

        <div className="flex gap-3 mb-5">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Suchen..."
              className="w-full pl-12 pr-4 py-3.5 bg-zinc-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`w-12 rounded-2xl flex items-center justify-center border transition-all ${showFilters ? "bg-zinc-900 border-zinc-900 text-white" : "bg-white border-zinc-200 text-zinc-500"}`}
          >
            <SlidersHorizontal className="w-5 h-5" />
          </button>
        </div>

        {showFilters && (
          <div className="mb-5 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400">
                Preis: {maxPrice}€
              </label>
              <input
                type="range"
                min="0"
                max="500"
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(Number(e.target.value))
                }
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-zinc-400">
                Stadtteil
              </label>
              <select
                value={selectedLoc}
                onChange={(e) => setSelectedLoc(e.target.value)}
                className="w-full bg-white border border-zinc-200 rounded-xl px-3 py-1.5 text-xs font-bold text-zinc-700 outline-none"
              >
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Category Filter Buttons */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl whitespace-nowrap transition-all font-bold text-xs uppercase tracking-tighter ${
                selectedCategory === cat.id
                  ? `${cat.color} text-white shadow-lg`
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-5 py-6">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto pb-32">
          {filteredListings.map((item) => {
            const theme = getCategoryTheme(item.category);
            return (
              <div
                key={item.id}
                onClick={() =>
                  navigate(`/marketplace/${item.id}`)
                }
                className="group bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="relative h-52 w-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badges Overlay */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div
                      className={`${theme.bg} ${theme.text} px-3 py-1 rounded-full text-[9px] font-black uppercase shadow-sm border ${theme.border} flex items-center gap-1`}
                    >
                      {item.category === "DIGITAL" && (
                        <Sparkles className="w-3 h-3" />
                      )}
                      {item.category}
                    </div>
                    {item.condition &&
                      item.category !== "DIGITAL" && (
                        <div className="bg-white/90 backdrop-blur-md text-zinc-900 px-3 py-1 rounded-full text-[9px] font-bold uppercase shadow-sm">
                          {item.condition}
                        </div>
                      )}
                  </div>

                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-zinc-900/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl shadow-xl">
                    <Euro className="w-4 h-4 text-primary" />{" "}
                    <span className="text-base font-black">
                      {item.price}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p
                    className={`text-[10px] font-black uppercase tracking-widest mb-2 ${theme.accent}`}
                  >
                    {item.subcategory}
                  </p>
                  <h3 className="font-bold text-zinc-900 text-lg leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-4">
                    {item.title}
                  </h3>

                  <div className="mt-auto pt-4 border-t border-zinc-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-zinc-400 font-bold text-[11px] uppercase tracking-tight">
                      <MapPin className="w-3.5 h-3.5" />{" "}
                      {item.location}
                    </div>
                    <div className="flex items-center gap-1 text-zinc-300 text-[10px]">
                      <Clock className="w-3 h-3" />{" "}
                      {item.postedTime}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}