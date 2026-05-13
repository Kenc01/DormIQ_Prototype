import { useState } from "react";
import { ArrowLeft, Shield, Star } from "lucide-react";
import { dorms, Dorm } from "../data/dorms";
import VsesScoreCircle from "../components/VsesScoreCircle";

interface DetailPageProps {
  dorm: Dorm;
  onBack: () => void;
}

export default function DetailPage({ dorm, onBack }: DetailPageProps) {
  const [imgError, setImgError] = useState(false);

  const metrics = [
    { label: "📶 WiFi Speed", score: dorm.wifiScore, pct: (Number(dorm.wifiScore) / 5) * 100 },
    { label: "🔇 Noise Level", score: dorm.noiseScore, pct: (Number(dorm.noiseScore) / 5) * 100 },
    { label: "🛡️ Safety Rating", score: dorm.safetyScore, pct: (Number(dorm.safetyScore) / 5) * 100 },
    { label: "💰 Cost Transparency", score: dorm.costScore, pct: (Number(dorm.costScore) / 5) * 100 },
  ];

  const similarDorms = dorms.filter(d => d.id !== dorm.id).slice(0, 2);

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="absolute top-7 left-0 right-0 p-4 z-10 flex items-center justify-between text-white">
        <button onClick={onBack} className="p-2 bg-black/30 rounded-full backdrop-blur-sm" data-testid="btn-back">
          <ArrowLeft className="w-5 h-5" />
        </button>
        {dorm.featured && (
          <div className="flex items-center gap-1 bg-[#028090] text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg mr-4">
            <Star className="w-3 h-3 fill-white" />
            <span>Featured Listing</span>
          </div>
        )}
      </header>

      <div className="relative h-[200px] overflow-hidden">
        {!imgError && dorm.image ? (
          <img
            src={dorm.image}
            alt={dorm.name}
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={`w-full h-full ${dorm.featured ? 'bg-gradient-to-br from-[#028090] to-[#02C39A]' : 'bg-gradient-to-br from-[#028090] to-[#02C39A]'}`} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute top-4 right-4 bg-[#F59E0B] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md mt-7">
          ⭐ {dorm.score}
        </div>
        <div className="absolute bottom-4 left-4">
          <h1 className="text-xl font-bold text-white drop-shadow">{dorm.name}</h1>
          <p className="text-xs text-white/80 mt-0.5">📍 {dorm.barangay}, Dapitan City</p>
        </div>
      </div>

      <div className="p-4 space-y-5 pb-6">
        {dorm.featured && (
          <div className="bg-[#028090]/10 border border-[#028090]/30 rounded-xl p-3 flex items-start gap-2">
            <Star className="w-4 h-4 text-[#028090] fill-[#028090] flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#028090]">Community-Recommended Listing</p>
              <p className="text-[11px] text-[#028090]/70 mt-0.5">Highlighted by DormIQ as a top-rated boarding house near JRMSU Dapitan.</p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-3 text-xs text-gray-600">
          <span>📍 {dorm.distance} from JRMSU</span>
          <span className="text-gray-300">|</span>
          <span className={`font-bold ${dorm.featured ? 'text-[#028090]' : 'text-primary-color'}`}>{dorm.price}</span>
          <span className="text-gray-300">|</span>
          <span>2 beds available</span>
        </div>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
          <h2 className="text-[10px] font-bold text-primary-color uppercase tracking-wider text-center mb-6">
            Verified Student Environment Score
          </h2>

          <div className="relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[160px] h-[160px] bg-primary-color/10 rounded-full animate-ping opacity-75" />
            </div>
            <VsesScoreCircle score={Number(dorm.score)} />
          </div>

          <div className="space-y-3 mt-6">
            {metrics.map((m) => (
              <div key={m.label}>
                <div className="flex justify-between text-xs font-medium text-gray-700 mb-1">
                  <span>{m.label}</span>
                  <span>{m.score}/5</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-color rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${m.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col items-center gap-2 text-center text-xs font-medium text-green-600">
            <div>✓ Verified by 12 student tenants</div>
            <div className="flex items-center gap-1.5 bg-[#028090]/10 text-[#028090] px-3 py-1.5 rounded-full border border-[#028090]/20">
              <Shield className="w-3.5 h-3.5" />
              <span>Dapitan City Verified</span>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
          <div className="text-xs text-gray-600 flex flex-col gap-2">
            <div>🏠 Owner: Mr. Dela Cruz</div>
            <div>☎️ 0912-xxx-xxxx</div>
            <div>✅ ID Verified</div>
          </div>
        </section>

        <section>
          <h3 className="font-bold text-sm mb-3">Student Reviews</h3>
          <div className="space-y-3">
            {dorm.reviews.map((rev, i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex text-[#F59E0B] text-sm">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j}>{j < rev.stars ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <span className="text-[10px] font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                    Verified Tenant ✓
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">{rev.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-bold text-sm mb-3">Similar Dorms</h3>
          <div className="flex gap-3 overflow-x-auto pb-2 snap-x no-scrollbar">
            {similarDorms.map((sd) => {
              const [thumbErr, setThumbErr] = useState(false);
              return (
                <div key={sd.id} className="flex-shrink-0 w-[170px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden snap-center">
                  <div className="h-[80px] overflow-hidden">
                    {!thumbErr && sd.image ? (
                      <img src={sd.image} alt={sd.name} className="w-full h-full object-cover" onError={() => setThumbErr(true)} />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#028090] to-[#02C39A]" />
                    )}
                  </div>
                  <div className="p-2.5">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="font-bold text-xs truncate pr-1">{sd.name}</h4>
                      <span className="bg-[#F59E0B] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full flex-shrink-0">{sd.score}</span>
                    </div>
                    <div className="text-[10px] text-gray-500">📍 {sd.barangay}</div>
                    <div className="text-xs font-bold text-primary-color mt-0.5">{sd.price}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <button
          className="w-full bg-primary-color text-white font-bold py-3.5 rounded-xl shadow-lg active:scale-[0.98] transition-transform"
          data-testid="btn-contact-landlord"
        >
          📩 Contact Landlord
        </button>
      </div>
    </div>
  );
}
