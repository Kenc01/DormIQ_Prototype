import { useState, useRef, useEffect } from "react";
import {
  Search,
  X,
  Wifi,
  VolumeX,
  Shield,
  DollarSign,
  Star,
  Clock,
  TrendingUp,
  SlidersHorizontal,
} from "lucide-react";
import { dorms, Dorm } from "../data/dorms";

interface SearchPageProps {
  onSelectDorm: (dorm: Dorm) => void;
}

// ── helpers ────────────────────────────────────────────────────────────────
const DOT = {
  green: "bg-green-500",
  yellow: "bg-yellow-400",
  red: "bg-red-500",
} as const;

const SCORE_BG = (s: string) => {
  const n = Number(s);
  if (n >= 4.5) return "bg-green-500";
  if (n >= 3.5) return "bg-[#F59E0B]";
  return "bg-red-400";
};

const INITIAL_RECENT = ["LTMPC", "Bagting", "Budget dorm", "near JRMSU"];

// ── category quick-filters ─────────────────────────────────────────────────
const CATEGORIES = [
  { label: "🏆 Top Rated", fn: (d: Dorm) => Number(d.score) >= 4.5 },
  { label: "💸 Budget", fn: (d: Dorm) => d.cost === "green" },
  { label: "📶 Fast WiFi", fn: (d: Dorm) => d.wifi === "green" },
  { label: "🔇 Quiet", fn: (d: Dorm) => d.noise === "green" },
  { label: "🛡️ Safe", fn: (d: Dorm) => d.safety === "green" },
  { label: "📍 < 0.5 km", fn: (d: Dorm) => parseFloat(d.distance) < 0.5 },
];

// ── thumb component ────────────────────────────────────────────────────────
function Thumb({ image, name, index }: { image: string; name: string; index: number }) {
  const [err, setErr] = useState(false);
  if (!err && image)
    return (
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-xl flex-shrink-0 object-cover"
        onError={() => setErr(true)}
      />
    );
  return (
    <div
      className={`w-20 h-20 rounded-xl flex-shrink-0 bg-gradient-to-br ${
        index % 2 === 0
          ? "from-[#028090] to-[#02C39A]"
          : "from-[#02C39A] to-[#E6F7F9]"
      }`}
    />
  );
}

// ── result card ────────────────────────────────────────────────────────────
function DormCard({
  dorm,
  index,
  query,
  onSelect,
}: {
  dorm: Dorm;
  index: number;
  query: string;
  onSelect: () => void;
}) {
  // highlight matching text
  const highlight = (text: string) => {
    if (!query.trim()) return <>{text}</>;
    const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
    const parts = text.split(re);
    return (
      <>
        {parts.map((p, i) =>
          re.test(p) ? (
            <mark key={i} className="bg-[#028090]/20 text-[#028090] rounded px-0.5 not-italic">
              {p}
            </mark>
          ) : (
            <span key={i}>{p}</span>
          )
        )}
      </>
    );
  };

  return (
    <button
      onClick={onSelect}
      className={`w-full bg-white rounded-xl shadow-sm p-3 flex gap-3 text-left active:scale-[0.98] transition-transform relative overflow-hidden ${
        dorm.featured ? "border-2 border-[#028090]" : "border border-gray-100"
      }`}
      data-testid={`search-card-${dorm.id}`}
    >
      {dorm.featured && (
        <div className="absolute top-0 right-0 bg-[#028090] text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
          <Star className="w-2.5 h-2.5 fill-white" /> Featured
        </div>
      )}

      <Thumb image={dorm.image} name={dorm.name} index={index} />

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start pr-14">
          <h3 className={`font-bold text-sm truncate ${dorm.featured ? "text-[#028090]" : "text-foreground"}`}>
            {highlight(dorm.name)}
          </h3>
        </div>

        <div className="flex items-center gap-2 mt-0.5">
          <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${SCORE_BG(dorm.score)}`}>
            {dorm.score}
          </span>
          <p className="text-[11px] text-gray-500">
            📍 {highlight(dorm.barangay)} · {dorm.distance}
          </p>
        </div>

        <p className={`text-xs font-bold mt-0.5 ${dorm.featured ? "text-[#028090]" : "text-primary-color"}`}>
          {dorm.price}
        </p>

        <div className="flex items-center gap-3 mt-2">
          {(
            [
              { Icon: Wifi, key: "wifi" },
              { Icon: VolumeX, key: "noise" },
              { Icon: Shield, key: "safety" },
              { Icon: DollarSign, key: "cost" },
            ] as { Icon: React.ElementType; key: keyof Dorm }[]
          ).map(({ Icon, key }) => (
            <div key={key} className="relative">
              <Icon className="w-3.5 h-3.5 text-gray-400" />
              <div
                className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${
                  DOT[dorm[key] as "green" | "yellow" | "red"]
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}

// ── main page ──────────────────────────────────────────────────────────────
export default function SearchPage({ onSelectDorm }: SearchPageProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [recent, setRecent] = useState<string[]>(INITIAL_RECENT);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // auto-focus on mount
  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 150);
  }, []);

  const handleSearch = (term: string) => {
    setQuery(term);
    setActiveCategory(null);
    if (term.trim() && !recent.includes(term.trim())) {
      setRecent((prev) => [term.trim(), ...prev].slice(0, 6));
    }
  };

  const handleClear = () => {
    setQuery("");
    setActiveCategory(null);
    inputRef.current?.focus();
  };

  // ── filter logic ───────────────────────────────────────────────────────
  const byQuery = query.trim()
    ? dorms.filter(
        (d) =>
          d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.barangay.toLowerCase().includes(query.toLowerCase())
      )
    : dorms;

  const byCategory =
    activeCategory !== null
      ? byQuery.filter(CATEGORIES[activeCategory].fn)
      : byQuery;

  const results = byCategory.sort((a, b) => Number(b.score) - Number(a.score));

  const isSearching = query.trim().length > 0 || activeCategory !== null;

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* ── sticky header ── */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-100 shadow-sm px-4 pt-4 pb-3 space-y-3">
        {/* title */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground leading-none">Find a Dorm</h1>
            <p className="text-[10px] text-gray-400 mt-0.5">Search by name or barangay</p>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-[#028090] font-semibold bg-[#028090]/10 px-2 py-1 rounded-full">
            <SlidersHorizontal className="w-3 h-3" />
            Filter
          </div>
        </div>

        {/* search bar */}
        <div
          className={`flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all ${
            focused
              ? "border-[#028090] shadow-[0_0_0_3px_rgba(2,128,144,0.12)] bg-white"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <Search className={`w-4.5 h-4.5 flex-shrink-0 transition-colors ${focused ? "text-[#028090]" : "text-gray-400"}`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch(query)}
            placeholder="e.g. Bagting, LTMPC, Budget..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400 text-foreground"
            data-testid="search-input"
          />
          {query && (
            <button onClick={handleClear} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* category chips */}
        <div className="flex gap-2 overflow-x-auto pb-0.5 no-scrollbar">
          {CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => {
                setActiveCategory(activeCategory === i ? null : i);
                setQuery("");
              }}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                activeCategory === i
                  ? "bg-[#028090] text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              data-testid={`category-chip-${i}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── body ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">

        {/* recent searches — shown only when not actively searching */}
        {!isSearching && (
          <>
            <section>
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 text-sm font-bold text-foreground">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  Recent Searches
                </div>
                <button
                  onClick={() => setRecent([])}
                  className="text-[10px] text-gray-400 hover:text-red-400 transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {recent.length === 0 ? (
                  <p className="text-xs text-gray-400 italic">No recent searches</p>
                ) : (
                  recent.map((r) => (
                    <button
                      key={r}
                      onClick={() => setQuery(r)}
                      className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-600 shadow-sm hover:border-[#028090] hover:text-[#028090] transition-all"
                    >
                      <Clock className="w-3 h-3 text-gray-300" />
                      {r}
                    </button>
                  ))
                )}
              </div>
            </section>

            <section>
              <div className="flex items-center gap-1.5 text-sm font-bold text-foreground mb-2.5">
                <TrendingUp className="w-3.5 h-3.5 text-[#028090]" />
                Top Picks This Week
              </div>
              <div className="space-y-3">
                {dorms
                  .filter((d) => d.featured || Number(d.score) >= 4.5)
                  .slice(0, 3)
                  .map((dorm, i) => (
                    <DormCard
                      key={dorm.id}
                      dorm={dorm}
                      index={i}
                      query=""
                      onSelect={() => onSelectDorm(dorm)}
                    />
                  ))}
              </div>
            </section>
          </>
        )}

        {/* search / category results */}
        {isSearching && (
          <section>
            <div className="flex justify-between items-center mb-3">
              <p className="text-xs text-gray-500 font-medium">
                {results.length === 0
                  ? "No results found"
                  : `${results.length} dorm${results.length > 1 ? "s" : ""} found`}
              </p>
              <p className="text-[10px] text-gray-400">Sorted by VSES Score ↓</p>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-16 flex flex-col items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-6 h-6 text-gray-300" />
                </div>
                <p className="text-sm font-semibold text-gray-500">No dorms match "{query}"</p>
                <p className="text-xs text-gray-400">Try a different name or barangay</p>
                <button
                  onClick={handleClear}
                  className="mt-1 text-[#028090] text-xs font-semibold underline underline-offset-2"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="space-y-3 pb-4">
                {results.map((dorm, i) => (
                  <DormCard
                    key={dorm.id}
                    dorm={dorm}
                    index={i}
                    query={query}
                    onSelect={() => onSelectDorm(dorm)}
                  />
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
