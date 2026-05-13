import { useState } from "react";
import { ArrowLeft, Wifi, VolumeX, Shield, DollarSign, Star } from "lucide-react";
import { dorms, Dorm } from "../data/dorms";

interface ResultsPageProps {
  onSelectDorm: (dorm: Dorm) => void;
  onBack: () => void;
}

function DormThumb({ image, name, index }: { image: string; name: string; index: number }) {
  const [err, setErr] = useState(false);
  if (!err && image) {
    return (
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-xl flex-shrink-0 object-cover"
        onError={() => setErr(true)}
      />
    );
  }
  return (
    <div className={`w-20 h-20 rounded-xl flex-shrink-0 bg-gradient-to-br ${
      index % 2 === 0 ? 'from-[#028090] to-[#02C39A]' : 'from-[#02C39A] to-[#E6F7F9]'
    }`} />
  );
}

export default function ResultsPage({ onSelectDorm, onBack }: ResultsPageProps) {
  const [activeBarangay, setActiveBarangay] = useState<string>("All");

  const filters = ["All", "WiFi 4+", "Budget", "Safety First", "Near Campus"];
  const barangays = ["All", "Sta. Cruz", "Bagting", "Potol", "Tagoloan", "San Pedro", "Polo", "Linabo", "Sicayab", "Banonong"];

  const filteredDorms = activeBarangay === "All"
    ? dorms
    : dorms.filter(d => d.barangay === activeBarangay);

  const getDotColor = (status: "green" | "yellow" | "red") => {
    switch (status) {
      case "green": return "bg-green-500";
      case "yellow": return "bg-yellow-400";
      case "red": return "bg-red-500";
    }
  };

  const getScoreColor = (score: string) => {
    const n = Number(score);
    if (n >= 4.5) return "bg-green-500";
    if (n >= 3.5) return "bg-[#F59E0B]";
    return "bg-red-400";
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <header className="p-4 bg-white sticky top-0 z-10 border-b border-gray-100 flex items-center gap-3 shadow-sm">
        <button onClick={onBack} className="p-1 -ml-1 text-gray-600" data-testid="btn-back">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-bold text-xl text-foreground">Dorms near JRMSU Dapitan</h1>
      </header>

      <div className="p-4 flex-1">
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
          {filters.map((filter, i) => (
            <button
              key={filter}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border ${
                i === 0
                  ? "bg-primary-color text-white border-primary-color"
                  : "bg-white text-gray-600 border-gray-200"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs text-gray-500 font-medium whitespace-nowrap">Barangay:</span>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {barangays.map(b => (
              <button
                key={b}
                onClick={() => setActiveBarangay(b)}
                className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-medium whitespace-nowrap transition-colors ${
                  activeBarangay === b
                    ? "bg-[#028090] text-white border border-[#028090]"
                    : "bg-white text-gray-600 border border-gray-200"
                }`}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center mb-3">
          <div className="text-xs text-gray-500">{filteredDorms.length} dorms found</div>
          <div className="text-xs text-gray-500">Sorted by: VSES Score ↓</div>
        </div>

        {filteredDorms.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            No dorms found in {activeBarangay}. Try another area.
          </div>
        ) : (
          <div className="space-y-3 pb-4">
            {filteredDorms.map((dorm, i) => (
              <button
                key={dorm.id}
                onClick={() => onSelectDorm(dorm)}
                className={`w-full bg-white rounded-xl shadow-sm p-3 flex gap-3 text-left active:scale-[0.98] transition-transform relative overflow-hidden ${
                  dorm.featured
                    ? "border-2 border-[#028090]"
                    : "border border-gray-100"
                }`}
                data-testid={`result-card-${dorm.id}`}
              >
                {dorm.featured && (
                  <div className="absolute top-0 right-0 bg-[#028090] text-white text-[9px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
                    <Star className="w-2.5 h-2.5 fill-white" /> Featured
                  </div>
                )}

                <DormThumb image={dorm.image} name={dorm.name} index={i} />

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start pr-14">
                    <h3 className={`font-bold text-sm truncate ${dorm.featured ? 'text-[#028090]' : 'text-foreground'}`}>
                      {dorm.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded-full ${getScoreColor(dorm.score)}`}>
                      {dorm.score}
                    </span>
                    <p className="text-[11px] text-gray-500">📍 {dorm.barangay} · {dorm.distance}</p>
                  </div>

                  <p className={`text-xs font-bold mt-0.5 ${dorm.featured ? 'text-[#028090]' : 'text-primary-color'}`}>
                    {dorm.price}
                  </p>

                  <div className="flex items-center gap-3 mt-2">
                    <div className="relative">
                      <Wifi className="w-3.5 h-3.5 text-gray-400" />
                      <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${getDotColor(dorm.wifi)}`} />
                    </div>
                    <div className="relative">
                      <VolumeX className="w-3.5 h-3.5 text-gray-400" />
                      <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${getDotColor(dorm.noise)}`} />
                    </div>
                    <div className="relative">
                      <Shield className="w-3.5 h-3.5 text-gray-400" />
                      <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${getDotColor(dorm.safety)}`} />
                    </div>
                    <div className="relative">
                      <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                      <div className={`absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white ${getDotColor(dorm.cost)}`} />
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
