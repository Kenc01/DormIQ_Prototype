import { Link } from "wouter";
import { Sparkles, ShieldCheck, Home, Zap } from "lucide-react";

export default function About() {
  const categories = [
    {
      icon: Sparkles,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      title: "Vibes",
      desc: "Social atmosphere, community feel, weekend energy, and how easy it is to meet people."
    },
    {
      icon: ShieldCheck,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      title: "Safety",
      desc: "Key fob security, nighttime lighting, RA presence, and emergency systems."
    },
    {
      icon: Home,
      color: "text-emerald-400",
      bg: "bg-emerald-500/10",
      title: "Environment",
      desc: "Cleanliness, noise levels, temperature control, and maintenance speed."
    },
    {
      icon: Zap,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
      title: "Services",
      desc: "Laundry reliability, dining hall proximity, WiFi speed, and study rooms."
    }
  ];

  return (
    <div className="p-6 pt-12 pb-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-black text-white mb-4">The VSES System</h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          DormScore goes beyond standard 5-star ratings. We use a proprietary 4-pillar system to give you the honest truth about campus housing.
        </p>
      </div>

      <div className="grid gap-4 mb-12">
        {categories.map((cat, i) => {
          const Icon = cat.icon;
          return (
            <div key={i} className="bg-card border border-card-border p-5 rounded-2xl flex gap-4">
              <div className={`shrink-0 w-12 h-12 rounded-full ${cat.bg} flex items-center justify-center`}>
                <Icon className={`w-6 h-6 ${cat.color}`} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">{cat.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{cat.desc}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl text-center mb-8">
        <h3 className="font-black text-xl text-white mb-2">Data-Driven Honesty</h3>
        <p className="text-muted-foreground text-sm mb-0">
          Scores are aggregated from hundreds of verified student surveys to ensure the administration can't hide the truth.
        </p>
      </div>

      <Link href="/dorms">
        <button className="w-full bg-primary text-primary-foreground font-bold text-lg py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-[0.98] transition-all" data-testid="btn-start-exploring">
          Start Exploring
        </button>
      </Link>
    </div>
  );
}