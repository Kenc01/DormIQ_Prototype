import { useParams, Link } from "wouter";
import { ChevronLeft, Star } from "lucide-react";
import { motion } from "framer-motion";
import { dorms } from "@/data/dorms";
import { getScoreColorClass, getScoreStrokeColor, getScoreBgClass } from "@/lib/score-utils";
import { cn } from "@/lib/utils";

function ScoreCircle({ score }: { score: number }) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 5.0) * circumference;
  const color = getScoreStrokeColor(score);

  return (
    <div className="relative flex items-center justify-center w-64 h-64 mx-auto my-8">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
        {/* Background Track */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="16"
          className="text-secondary"
        />
        {/* Animated Progress Ring */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ strokeDasharray: circumference }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">VSES Score</span>
        <motion.span 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className={cn("text-6xl font-black tracking-tighter", getScoreColorClass(score))}
          data-testid="hero-score"
        >
          {score.toFixed(1)}
        </motion.span>
        <span className="text-sm font-semibold text-muted-foreground mt-1">out of 5.0</span>
      </div>
    </div>
  );
}

function ProgressBar({ label, score }: { label: string, score: number }) {
  return (
    <div className="mb-4 last:mb-0">
      <div className="flex justify-between mb-1.5">
        <span className="font-bold text-sm text-white">{label}</span>
        <span className={cn("font-bold text-sm", getScoreColorClass(score))}>{score.toFixed(1)}</span>
      </div>
      <div className="h-3 w-full bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(score / 5) * 100}%` }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className={cn("h-full rounded-full", getScoreBgClass(score))}
        />
      </div>
    </div>
  );
}

export default function Detail() {
  const { id } = useParams();
  const dorm = dorms.find(d => d.id === id);

  if (!dorm) return <div className="p-8 text-center">Dorm not found.</div>;

  return (
    <div className="pb-8">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-xl border-b border-border/50 px-4 py-4 flex items-center">
        <Link href="/dorms" className="p-2 -ml-2 rounded-full hover:bg-secondary transition-colors" data-testid="btn-back">
          <ChevronLeft className="w-6 h-6 text-white" />
        </Link>
        <div className="ml-2">
          <h1 className="text-xl font-bold text-white leading-tight">{dorm.name}</h1>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] font-bold px-1.5 py-0.5 bg-secondary rounded text-muted-foreground uppercase tracking-widest">
              {dorm.type}
            </span>
            <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">
              Est. {dorm.yearBuilt}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Score */}
      <ScoreCircle score={dorm.vses.overall} />

      {/* VSES Breakdown */}
      <div className="px-6 mb-10">
        <div className="bg-card border border-card-border rounded-3xl p-6 shadow-sm">
          <h3 className="font-black text-lg text-white mb-6 flex items-center gap-2">
            Score Breakdown
          </h3>
          <ProgressBar label="Vibes" score={dorm.vses.vibes} />
          <ProgressBar label="Safety" score={dorm.vses.safety} />
          <ProgressBar label="Environment" score={dorm.vses.environment} />
          <ProgressBar label="Services" score={dorm.vses.services} />
        </div>
      </div>

      {/* Summary */}
      <div className="px-6 mb-10">
        <h3 className="font-black text-xl text-white mb-3">About {dorm.name}</h3>
        <p className="text-muted-foreground leading-relaxed text-lg">
          {dorm.summary}
        </p>
      </div>

      {/* Reviews */}
      <div className="px-6">
        <h3 className="font-black text-xl text-white mb-4">Student Reviews</h3>
        <div className="flex flex-col gap-4">
          {dorm.reviews.map((review, i) => (
            <div key={i} className="bg-secondary/40 border border-border p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white">{review.name}</span>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star 
                      key={j} 
                      className={cn("w-4 h-4", j < review.stars ? "fill-amber-400 text-amber-400" : "fill-secondary text-secondary")} 
                    />
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}