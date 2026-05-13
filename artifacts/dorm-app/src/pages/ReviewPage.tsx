import { useState } from "react";
import { ArrowLeft, Star, CheckCircle2, Wifi, VolumeX, Shield, DollarSign, ChevronRight } from "lucide-react";
import { Dorm, dorms } from "../data/dorms";

interface ReviewPageProps {
  onBack: () => void;
  selectedDorm: Dorm;
}

const QUICK_TAGS = [
  ["Fast WiFi", "Slow WiFi"],
  ["Very Clean", "Needs Cleaning"],
  ["Very Quiet", "Noisy at Night"],
  ["Super Safe", "Felt Unsafe"],
  ["Worth It", "Overpriced"],
  ["Friendly Landlord", "Unresponsive Landlord"],
];

const CATEGORIES = [
  { id: "wifi" as const, label: "WiFi Speed", icon: Wifi, desc: "Connectivity for online classes" },
  { id: "noise" as const, label: "Noise Level", icon: VolumeX, desc: "Peace and quiet for studying" },
  { id: "safety" as const, label: "Safety", icon: Shield, desc: "Security and neighborhood safety" },
  { id: "cost" as const, label: "Value for Money", icon: DollarSign, desc: "Price vs. quality" },
];

function StarRow({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(s => {
        const active = s <= (hovered || value);
        return (
          <button
            key={s}
            onMouseEnter={() => setHovered(s)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => onChange(s)}
            className={`text-2xl transition-transform active:scale-125 ${active ? "text-[#F59E0B]" : "text-gray-200"}`}
          >★</button>
        );
      })}
    </div>
  );
}

function DormThumb({ dorm }: { dorm: Dorm }) {
  const [err, setErr] = useState(false);
  return (
    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0">
      {!err && dorm.image
        ? <img src={dorm.image} alt={dorm.name} className="w-full h-full object-cover" onError={() => setErr(true)} />
        : <div className="w-full h-full bg-gradient-to-br from-[#028090] to-[#02C39A]" />
      }
    </div>
  );
}

export default function ReviewPage({ onBack, selectedDorm }: ReviewPageProps) {
  const [step, setStep] = useState(1);
  const [activeDorm, setActiveDorm] = useState<Dorm>(selectedDorm);
  const [ratings, setRatings] = useState({ wifi: 0, noise: 0, safety: 0, cost: 0 });
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState("");

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]);
  };

  const avgScore = () => {
    const vals = Object.values(ratings).filter(v => v > 0);
    if (!vals.length) return 0;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  };

  const allRated = Object.values(ratings).every(v => v > 0);

  const getScoreColor = (s: number) => s >= 4.5 ? "#16a34a" : s >= 3.5 ? "#028090" : s >= 2.5 ? "#f59e0b" : "#ef4444";

  const STEPS = ["Verify", "Rate", "Done"];

  return (
    <div className="flex flex-col min-h-full bg-[#F8FFFE]">
      {/* Header */}
      <header className="p-4 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-1.5 -ml-1 text-gray-500 hover:text-gray-800" data-testid="btn-back">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="font-bold text-lg text-foreground leading-none">Submit a Review</h1>
            <p className="text-[10px] text-gray-400 mt-0.5">Anonymous · Verified by School ID</p>
          </div>
        </div>

        {/* Step progress bar */}
        <div className="mt-4 flex items-center gap-0">
          {STEPS.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;
            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    done ? "bg-[#028090] border-[#028090] text-white"
                    : active ? "bg-white border-[#028090] text-[#028090]"
                    : "bg-white border-gray-200 text-gray-400"
                  }`}>
                    {done ? "✓" : n}
                  </div>
                  <span className={`text-[9px] mt-1 font-semibold ${active ? "text-[#028090]" : done ? "text-gray-500" : "text-gray-300"}`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-3 rounded-full transition-all ${done ? "bg-[#028090]" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </header>

      <div className="p-4 flex-1 space-y-4 pb-8">

        {/* ── STEP 1: VERIFY ── */}
        {step === 1 && (
          <>
            <div className="bg-[#028090]/8 border border-[#028090]/20 rounded-xl p-3 flex items-start gap-2.5">
              <span className="text-lg">🎓</span>
              <div>
                <p className="text-xs font-bold text-[#028090]">Why we verify students</p>
                <p className="text-[11px] text-[#028090]/70 mt-0.5 leading-relaxed">Only real JRMSU students can submit reviews. This keeps the VSES score trustworthy and reliable for everyone.</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 space-y-4">
              {/* Dorm selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Which dorm are you reviewing?</label>
                <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                  {dorms.map(d => (
                    <button
                      key={d.id}
                      onClick={() => setActiveDorm(d)}
                      className={`w-full flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all text-left ${
                        activeDorm.id === d.id ? "border-[#028090] bg-[#028090]/5" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <DormThumb dorm={d} />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold truncate">{d.name}</div>
                        <div className="text-[10px] text-gray-500">📍 {d.barangay}</div>
                      </div>
                      {activeDorm.id === d.id && (
                        <div className="w-5 h-5 rounded-full bg-[#028090] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-[10px]">✓</span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* ID upload */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Upload JRMSU Student ID</label>
                <div className="border-2 border-dashed border-[#028090]/30 bg-[#028090]/5 rounded-xl p-5 flex flex-col items-center text-center gap-1.5">
                  <span className="text-3xl">🪪</span>
                  <p className="text-xs font-semibold text-[#028090]">Tap to upload your ID</p>
                  <p className="text-[10px] text-gray-400">PNG, JPG supported · Front side only</p>
                </div>
                <p className="text-[9px] text-gray-400 mt-1.5 flex items-center gap-1">🔒 ID used for verification only. Never stored or shared.</p>
              </div>

              {/* Student number */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">Student Number</label>
                <input
                  type="text"
                  placeholder="e.g. JRMSU-2024-00123"
                  className="w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#028090] focus:ring-1 focus:ring-[#028090] bg-white"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#028090] text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              Verify & Continue <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* ── STEP 2: RATE ── */}
        {step === 2 && (
          <>
            {/* Dorm being reviewed */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex items-center gap-3">
              <DormThumb dorm={activeDorm} />
              <div className="flex-1">
                <div className="text-sm font-bold text-foreground">{activeDorm.name}</div>
                <div className="text-[11px] text-gray-500">📍 {activeDorm.barangay} · {activeDorm.distance} from JRMSU</div>
              </div>
              <div className={`text-xs font-bold text-white px-2.5 py-1 rounded-full`} style={{ background: getScoreColor(Number(activeDorm.score)) }}>
                {activeDorm.score}
              </div>
            </div>

            {/* Star ratings */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 space-y-4">
              <p className="text-xs font-bold text-gray-700">Rate each category</p>
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                return (
                  <div key={cat.id}>
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#028090]/10 flex items-center justify-center">
                          <Icon className="w-3.5 h-3.5 text-[#028090]" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-foreground">{cat.label}</div>
                          <div className="text-[9px] text-gray-400">{cat.desc}</div>
                        </div>
                      </div>
                      <StarRow value={ratings[cat.id]} onChange={v => setRatings(p => ({ ...p, [cat.id]: v }))} />
                    </div>
                    {cat.id !== "cost" && <div className="border-b border-gray-50 mt-3" />}
                  </div>
                );
              })}
            </div>

            {/* Live VSES preview */}
            {avgScore() > 0 && (
              <div className="bg-white rounded-xl shadow-sm border border-[#028090]/20 p-4 flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-md"
                  style={{ background: `conic-gradient(${getScoreColor(avgScore())} ${avgScore() / 5 * 360}deg, #e5e7eb ${avgScore() / 5 * 360}deg)` }}
                >
                  <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                    <span className="text-sm font-black" style={{ color: getScoreColor(avgScore()) }}>
                      {avgScore().toFixed(1)}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#028090]">Your VSES Contribution</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">This score will be averaged with existing student reviews</p>
                </div>
              </div>
            )}

            {/* Quick tags */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <p className="text-xs font-bold text-gray-700 mb-3">Quick tags <span className="font-normal text-gray-400">(optional)</span></p>
              <div className="flex flex-wrap gap-2">
                {QUICK_TAGS.flat().map(tag => (
                  <button
                    key={tag}
                    onClick={() => toggleTag(tag)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold border transition-all ${
                      selectedTags.includes(tag)
                        ? "bg-[#028090] text-white border-[#028090]"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Written review */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <p className="text-xs font-bold text-gray-700 mb-2">Written Review <span className="font-normal text-gray-400">(optional)</span></p>
              <textarea
                placeholder="Tell other students about your experience living here..."
                className="w-full h-[90px] rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#028090] focus:ring-1 focus:ring-[#028090] resize-none"
                value={reviewText}
                onChange={e => setReviewText(e.target.value.slice(0, 280))}
              />
              <div className="text-right text-[10px] text-gray-400 mt-1">{reviewText.length}/280</div>
            </div>

            <button
              onClick={() => setStep(3)}
              disabled={!allRated}
              className={`w-full font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-all ${
                allRated ? "bg-[#028090] text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }`}
            >
              <Star className="w-4 h-4" /> Submit Review
            </button>
            {!allRated && (
              <p className="text-center text-[11px] text-gray-400">Rate all 4 categories to submit</p>
            )}
          </>
        )}

        {/* ── STEP 3: SUCCESS ── */}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
            <div className="relative">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <div className="absolute -top-1 -right-1 text-2xl animate-spin" style={{ animationDuration: "3s" }}>⭐</div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-foreground">Review Submitted!</h2>
              <p className="text-sm text-gray-500 mt-1">Thank you for contributing to the community.</p>
            </div>

            {/* Impact card */}
            <div className="w-full bg-[#028090] text-white rounded-2xl p-5 text-left shadow-lg">
              <p className="text-xs font-bold opacity-70 uppercase tracking-wider mb-3">Your impact</p>
              <div className="flex gap-4">
                <div className="flex-1 text-center">
                  <div className="text-2xl font-black">{avgScore().toFixed(1)}</div>
                  <div className="text-[10px] opacity-70 mt-0.5">Your VSES score</div>
                </div>
                <div className="w-px bg-white/20" />
                <div className="flex-1 text-center">
                  <div className="text-2xl font-black">324</div>
                  <div className="text-[10px] opacity-70 mt-0.5">Students helped</div>
                </div>
                <div className="w-px bg-white/20" />
                <div className="flex-1 text-center">
                  <div className="text-2xl font-black">✓</div>
                  <div className="text-[10px] opacity-70 mt-0.5">ID Verified</div>
                </div>
              </div>
            </div>

            {selectedTags.length > 0 && (
              <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Your tags</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedTags.map(t => (
                    <span key={t} className="text-[11px] bg-[#028090]/10 text-[#028090] font-semibold px-2.5 py-1 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
            )}

            <p className="text-[11px] text-gray-400">Your review will appear on {activeDorm.name} within a few minutes.</p>

            <div className="flex gap-3 w-full pt-2">
              <button
                onClick={() => { setStep(1); setRatings({ wifi: 0, noise: 0, safety: 0, cost: 0 }); setSelectedTags([]); setReviewText(""); onBack(); }}
                className="flex-1 py-3 rounded-xl border border-gray-200 font-bold text-gray-600 text-sm active:bg-gray-50"
              >
                Back to Home
              </button>
              <button
                onClick={() => { setStep(1); setRatings({ wifi: 0, noise: 0, safety: 0, cost: 0 }); setSelectedTags([]); setReviewText(""); }}
                className="flex-1 py-3 rounded-xl bg-[#028090] text-white font-bold text-sm active:scale-[0.98]"
              >
                Review Another
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
