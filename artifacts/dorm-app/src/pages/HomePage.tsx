import { useState } from "react";
import { Search, Star, ChevronRight, Settings } from "lucide-react";
import { dorms, Dorm } from "../data/dorms";
import DormMap from "../components/DormMap";

interface HomePageProps {
  onSelectDorm: (dorm: Dorm) => void;
  onBrowse: () => void;
  onSearch?: () => void;
  onSettings?: () => void;
}

function DormCard({
  dorm,
  index,
  onSelect,
}: {
  dorm: Dorm;
  index: number;
  onSelect: () => void;
}) {
  const [imgError, setImgError] = useState(false);
  return (
    <button
      onClick={onSelect}
      className={`flex-shrink-0 w-[220px] bg-white rounded-xl shadow-sm overflow-hidden text-left snap-center active:scale-[0.97] transition-transform ${
        dorm.featured ? "border-2 border-[#028090]" : "border border-gray-100"
      }`}
      data-testid={`preview-card-${dorm.id}`}
    >
      <div className="h-[120px] overflow-hidden relative">
        {!imgError && dorm.image ? (
          <img
            src={dorm.image}
            alt={dorm.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className={`w-full h-full bg-gradient-to-br ${
              index === 0
                ? "from-[#028090] to-[#02C39A]"
                : "from-[#02C39A] to-[#E6F7F9]"
            }`}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {dorm.featured && (
          <div className="absolute top-2 left-2 bg-[#028090] text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            <Star className="w-2.5 h-2.5 fill-white" /> Our Pick
          </div>
        )}
        <span className="absolute bottom-2 left-2 text-white font-bold text-xs drop-shadow">
          {dorm.name}
        </span>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center">
          <p className="text-[11px] text-gray-500">
            📍 {dorm.barangay} · {dorm.distance}
          </p>
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full text-white ${
              Number(dorm.score) >= 4.5
                ? "bg-green-500"
                : Number(dorm.score) >= 3.5
                ? "bg-[#F59E0B]"
                : "bg-red-400"
            }`}
          >
            {dorm.score}
          </span>
        </div>
        <p
          className={`text-xs font-bold mt-1 ${
            dorm.featured ? "text-[#028090]" : "text-primary-color"
          }`}
        >
          {dorm.price}
        </p>
      </div>
    </button>
  );
}

export default function HomePage({ onSelectDorm, onBrowse, onSearch, onSettings }: HomePageProps) {
  const [activeBarangay, setActiveBarangay] = useState<string>("All");
  const barangays = [
    "All",
    "Sta. Cruz",
    "Bagting",
    "Potol",
    "Tagoloan",
    "San Pedro",
    "Polo",
    "Linabo",
    "Sicayab",
    "Banonong",
  ];

  const filteredDorms =
    activeBarangay === "All"
      ? dorms
      : dorms.filter((d) => d.barangay === activeBarangay);

  const displayDorms = filteredDorms.length > 0 ? filteredDorms : dorms;

  return (
    <div className="p-4 pb-8 space-y-5">
      {/* ── header ── */}
      <header>
        <div className="flex items-center gap-2.5 justify-between">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            className="w-9 h-9 flex-shrink-0"
          >
            <defs>
              <linearGradient id="pinG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#02C39A" }} />
                <stop offset="100%" style={{ stopColor: "#028090" }} />
              </linearGradient>
            </defs>
            <path
              d="M50 4C29.0 4 12 21.0 12 42C12 60.5 50 96 50 96C50 96 88 60.5 88 42C88 21.0 71.0 4 50 4Z"
              fill="url(#pinG)"
            />
            <circle cx="50" cy="40" r="26" fill="white" opacity="0.15" />
            <text
              x="50"
              y="53"
              fontFamily="Arial,Helvetica,sans-serif"
              fontSize="30"
              fontWeight="900"
              fill="white"
              textAnchor="middle"
              letterSpacing="-1"
            >
              IQ
            </text>
          </svg>
          <div>
            <h1 className="text-xl font-bold text-primary-color leading-none">
              DormIQ
            </h1>
            <p className="text-[10px] text-gray-400 mt-0.5 font-medium">
              Dapitan City · JRMSU Area
            </p>
          </div>
          {onSettings && (
            <button
              onClick={onSettings}
              className="ml-auto p-2 rounded-xl text-gray-400 hover:text-[#028090] hover:bg-[#028090]/10 transition-colors"
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-2.5">
          Find your dorm smarter. Live better. Study harder.
        </p>

        {/* stats row */}
        <div className="mt-3 bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex divide-x divide-gray-100">
          <div className="flex-1 text-center">
            <div className="text-primary-color font-bold text-sm">324</div>
            <div className="text-[10px] text-gray-500 font-medium mt-0.5">
              Dorms Listed
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-primary-color font-bold text-sm">1,200+</div>
            <div className="text-[10px] text-gray-500 font-medium mt-0.5">
              Student Reviews
            </div>
          </div>
          <div className="flex-1 text-center">
            <div className="text-primary-color font-bold text-sm">10</div>
            <div className="text-[10px] text-gray-500 font-medium mt-0.5">
              Barangays
            </div>
          </div>
        </div>
      </header>

      {/* ── fake search bar — tapping opens Search tab ── */}
      <button
        onClick={onSearch}
        className="w-full bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex items-center gap-3 text-left hover:border-[#028090] transition-colors"
        data-testid="home-search-cta"
      >
        <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
        <span className="text-sm text-gray-400 flex-1">
          Search dorms near your school...
        </span>
        <span className="text-[10px] font-semibold text-white bg-[#028090] px-2.5 py-1 rounded-full">
          Search
        </span>
      </button>

      {/* ── map ── */}
      <DormMap onSelectDorm={onSelectDorm} />

      {/* ── barangay filter ── */}
      <section>
        <h2 className="text-sm font-bold mb-2 text-foreground">
          Browse by Barangay
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {barangays.map((b) => (
            <button
              key={b}
              onClick={() => setActiveBarangay(b)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                activeBarangay === b
                  ? "bg-[#028090] text-white border border-[#028090]"
                  : "bg-white text-gray-600 border border-gray-200"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </section>

      {/* ── nearby dorms carousel ── */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-foreground">Nearby Dorms</h2>
          <button
            onClick={onBrowse}
            className="flex items-center gap-0.5 text-[11px] font-semibold text-[#028090]"
            data-testid="home-see-all"
          >
            See all <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 snap-x no-scrollbar">
          {displayDorms.slice(0, 6).map((dorm, index) => (
            <DormCard
              key={dorm.id}
              dorm={dorm}
              index={index}
              onSelect={() => onSelectDorm(dorm)}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
