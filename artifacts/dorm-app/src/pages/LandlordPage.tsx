import { useState } from "react";
import { CheckCircle2, ChevronRight, Wifi, Wind, ShowerHead, Flame, Lock, Zap, Car, Utensils } from "lucide-react";

const AMENITIES = [
  { id: "wifi", icon: Wifi, label: "WiFi" },
  { id: "aircon", icon: Wind, label: "Aircon" },
  { id: "bathroom", icon: ShowerHead, label: "Private Bathroom" },
  { id: "hotwater", icon: Flame, label: "Hot Water" },
  { id: "security", icon: Lock, label: "24/7 Security" },
  { id: "electric", icon: Zap, label: "Electric Included" },
  { id: "parking", icon: Car, label: "Parking" },
  { id: "kitchen", icon: Utensils, label: "Kitchen Access" },
];

const BARANGAYS = ["Sta. Cruz", "Bagting", "Potol", "Tagoloan", "San Pedro", "Polo", "Linabo", "Sicayab", "Banonong", "Tagoloan II"];

const STEPS = ["Basic Info", "Amenities", "Plan", "Done"];

export default function LandlordPage() {
  const [step, setStep] = useState(1);
  const [amenities, setAmenities] = useState<string[]>(["wifi", "security"]);
  const [listingType, setListingType] = useState<"free" | "featured">("free");
  const [barangay, setBarangay] = useState("");

  const toggleAmenity = (id: string) => {
    setAmenities(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F8FFFE]">

      {/* Hero header */}
      <div className="bg-gradient-to-br from-[#028090] to-[#02C39A] p-5 pb-6">
        <h1 className="text-xl font-black text-white leading-tight">List Your Boarding House</h1>
        <p className="text-white/80 text-xs mt-1">Reach verified JRMSU student tenants in Dapitan City</p>

        <div className="flex gap-3 mt-4">
          {[
            { value: "324", label: "Active listings" },
            { value: "1,200+", label: "Student searches/mo" },
            { value: "4.8★", label: "Avg landlord rating" },
          ].map(stat => (
            <div key={stat.label} className="flex-1 bg-white/15 backdrop-blur rounded-xl p-2.5 text-center">
              <div className="text-white font-black text-sm">{stat.value}</div>
              <div className="text-white/70 text-[9px] mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Step progress */}
      <div className="bg-white border-b border-gray-100 px-5 py-3 shadow-sm">
        <div className="flex items-center gap-0">
          {STEPS.map((label, i) => {
            const n = i + 1;
            const done = n < step;
            const active = n === step;
            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border-2 transition-all ${
                    done ? "bg-[#028090] border-[#028090] text-white"
                    : active ? "bg-white border-[#028090] text-[#028090]"
                    : "bg-white border-gray-200 text-gray-400"
                  }`}>
                    {done ? "✓" : n}
                  </div>
                  <span className={`text-[9px] mt-0.5 font-semibold whitespace-nowrap ${active ? "text-[#028090]" : done ? "text-gray-500" : "text-gray-300"}`}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 mb-3 rounded-full ${done ? "bg-[#028090]" : "bg-gray-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 pb-10 space-y-4 flex-1">

        {/* ── STEP 1: BASIC INFO ── */}
        {step === 1 && (
          <>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Property Details</p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 space-y-3">
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Property Name</label>
                <input
                  type="text"
                  placeholder="e.g. Santos Boarding House"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#028090] focus:ring-1 focus:ring-[#028090] bg-white"
                />
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Barangay</label>
                <select
                  className="mt-1.5 w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#028090] focus:ring-1 focus:ring-[#028090] bg-white"
                  value={barangay}
                  onChange={e => setBarangay(e.target.value)}
                >
                  <option value="">Select barangay...</option>
                  {BARANGAYS.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Street / Purok Address</label>
                <input
                  type="text"
                  placeholder="e.g. Purok 3, near JRMSU gate"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#028090] focus:ring-1 focus:ring-[#028090] bg-white"
                />
              </div>
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Monthly Price (₱)</label>
                  <input
                    type="number"
                    placeholder="e.g. 1500"
                    className="mt-1.5 w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#028090] bg-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Rooms Available</label>
                  <input
                    type="number"
                    placeholder="e.g. 4"
                    className="mt-1.5 w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#028090] bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Contact Number</label>
                <input
                  type="tel"
                  placeholder="e.g. 0912-345-6789"
                  className="mt-1.5 w-full rounded-xl border border-gray-200 p-3 text-sm outline-none focus:border-[#028090] bg-white"
                />
              </div>
            </div>

            {/* Photo upload */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Property Photos</label>
              <div className="mt-2.5 border-2 border-dashed border-[#028090]/30 bg-[#028090]/5 rounded-xl p-5 flex flex-col items-center gap-1.5">
                <span className="text-3xl">📷</span>
                <p className="text-xs font-bold text-[#028090]">Tap to add photos</p>
                <p className="text-[10px] text-gray-400">Room interior, exterior, and common areas</p>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#028090] text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            >
              Next: Amenities <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* ── STEP 2: AMENITIES ── */}
        {step === 2 && (
          <>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">What's included?</p>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <p className="text-xs text-gray-500 mb-4">Tap to select all amenities your property offers</p>
              <div className="grid grid-cols-2 gap-2.5">
                {AMENITIES.map(a => {
                  const Icon = a.icon;
                  const active = amenities.includes(a.id);
                  return (
                    <button
                      key={a.id}
                      onClick={() => toggleAmenity(a.id)}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border-2 transition-all text-left ${
                        active ? "border-[#028090] bg-[#028090]/8 text-[#028090]" : "border-gray-100 bg-gray-50 text-gray-500"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${active ? "bg-[#028090]/15" : "bg-white"}`}>
                        <Icon className={`w-4 h-4 ${active ? "text-[#028090]" : "text-gray-400"}`} />
                      </div>
                      <span className={`text-xs font-semibold leading-tight ${active ? "text-[#028090]" : "text-gray-600"}`}>{a.label}</span>
                      {active && <span className="ml-auto text-[#028090] text-xs">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            {amenities.length > 0 && (
              <div className="bg-[#028090]/8 border border-[#028090]/20 rounded-xl p-3">
                <p className="text-[11px] font-bold text-[#028090]">{amenities.length} amenities selected</p>
                <p className="text-[10px] text-[#028090]/60 mt-0.5">Properties with more amenities get 3× more student inquiries</p>
              </div>
            )}

            {/* Owner ID */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <label className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Owner Verification ID</label>
              <div className="mt-2.5 border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center gap-1.5">
                <span className="text-2xl">🪪</span>
                <p className="text-xs font-semibold text-gray-600">Upload government-issued ID</p>
                <p className="text-[10px] text-gray-400">UMID, Passport, PhilSys ID</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 font-bold text-gray-600 text-sm">
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-2 flex-1 bg-[#028090] text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                Next: Choose Plan <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* ── STEP 3: PLAN ── */}
        {step === 3 && (
          <>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Choose Your Listing Plan</p>

            {/* Free plan */}
            <button
              onClick={() => setListingType("free")}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${
                listingType === "free" ? "border-[#028090] bg-[#028090]/5 shadow-md" : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-black text-base text-foreground">Free Listing</div>
                  <div className="text-xs text-gray-400 mt-0.5">No cost, always</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  listingType === "free" ? "border-[#028090] bg-[#028090]" : "border-gray-300"
                }`}>
                  {listingType === "free" && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>
              <div className="space-y-1.5">
                {["Listed on DormIQ", "Student reviews enabled", "VSES score displayed", "Contact form"].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="text-green-500">✓</span> {f}
                  </div>
                ))}
              </div>
            </button>

            {/* Featured plan */}
            <button
              onClick={() => setListingType("featured")}
              className={`w-full text-left rounded-2xl border-2 p-4 transition-all relative overflow-hidden ${
                listingType === "featured" ? "border-[#028090] bg-[#028090]/5 shadow-md" : "border-gray-200 bg-white"
              }`}
            >
              <div className="absolute top-0 right-0 bg-[#F59E0B] text-white text-[9px] font-black px-3 py-1 rounded-bl-xl">
                MOST POPULAR
              </div>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-black text-base text-foreground">Featured Listing</div>
                  <div className="text-xs text-gray-400 mt-0.5">₱300 / month</div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  listingType === "featured" ? "border-[#028090] bg-[#028090]" : "border-gray-300"
                }`}>
                  {listingType === "featured" && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
              </div>
              <div className="space-y-1.5">
                {[
                  "Everything in Free",
                  "⭐ Featured badge on listing",
                  "Top of search results",
                  "Pin on DormIQ map",
                  "Priority in barangay filter",
                  "Monthly analytics report",
                ].map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="text-[#028090]">✓</span> {f}
                  </div>
                ))}
              </div>
            </button>

            {listingType === "featured" && (
              <div className="bg-[#F59E0B]/10 border border-[#F59E0B]/30 rounded-xl p-3 text-[11px] text-amber-700 font-medium">
                ⚡ Featured listings get <strong>5× more</strong> student views and 3× faster tenants on average.
              </div>
            )}

            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 font-bold text-gray-600 text-sm">
                ← Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 bg-[#028090] text-white font-bold py-3.5 rounded-xl shadow-md flex items-center justify-center gap-1.5 active:scale-[0.98]"
              >
                Submit Listing <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

        {/* ── STEP 4: SUCCESS ── */}
        {step === 4 && (
          <div className="flex flex-col items-center py-6 text-center space-y-4">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>

            <div>
              <h2 className="text-2xl font-black text-foreground">Listing Submitted!</h2>
              <p className="text-sm text-gray-500 mt-1">We'll review your property within 24 hours.</p>
            </div>

            <div className="w-full bg-gradient-to-br from-[#028090] to-[#02C39A] rounded-2xl p-5 text-left shadow-lg text-white">
              <p className="text-xs font-bold opacity-70 uppercase tracking-wider mb-3">Your listing summary</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Plan</span>
                  <span className="font-bold capitalize">{listingType === "featured" ? "⭐ Featured" : "Free"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Amenities</span>
                  <span className="font-bold">{amenities.length} selected</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Status</span>
                  <span className="font-bold">⏳ Under Review</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="opacity-70">Estimated go-live</span>
                  <span className="font-bold">Within 24 hours</span>
                </div>
              </div>
            </div>

            <div className="w-full bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-left">
              <p className="text-xs font-bold text-gray-600 mb-2">What happens next?</p>
              <div className="space-y-2.5">
                {[
                  { icon: "📋", text: "DormIQ team reviews your submission" },
                  { icon: "✅", text: "Your ID and property details are verified" },
                  { icon: "🚀", text: "Your listing goes live to 1,200+ student searches" },
                ].map(step => (
                  <div key={step.text} className="flex items-start gap-2.5 text-xs text-gray-600">
                    <span className="text-base">{step.icon}</span>
                    <span>{step.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full py-3.5 rounded-xl bg-[#028090] text-white font-bold active:scale-[0.98] transition-transform"
            >
              List Another Property
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
