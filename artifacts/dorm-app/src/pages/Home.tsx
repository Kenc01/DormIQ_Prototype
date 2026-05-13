import { Link } from "wouter";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { dorms } from "@/data/dorms";
import { getScoreColorClass } from "@/lib/score-utils";
import { cn } from "@/lib/utils";

export default function Home() {
  const featuredDorms = dorms.filter(d => d.vses.overall >= 4.6).slice(0, 3);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <header className="mt-8 mb-8">
        <h1 className="text-4xl font-black tracking-tight text-white mb-2">
          Dorm<span className="text-primary">Score</span>
        </h1>
        <p className="text-muted-foreground font-medium text-lg">Find your perfect campus vibe.</p>
      </header>

      <div className="relative mb-10 group" data-testid="search-bar-container">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <Link href="/dorms">
          <div className="w-full bg-secondary text-foreground rounded-2xl pl-12 pr-4 py-4 text-base font-medium shadow-sm border border-transparent flex items-center text-muted-foreground">
            Search dorms, types, vibes...
          </div>
        </Link>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Top Rated</h2>
          <Link href="/dorms" className="text-sm font-semibold text-primary" data-testid="link-view-all">View all</Link>
        </div>
        
        <div className="flex flex-col gap-4">
          {featuredDorms.map((dorm, i) => (
            <Link key={dorm.id} href={`/dorms/${dorm.id}`}>
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileTap={{ scale: 0.97 }}
                className="bg-card border border-card-border p-4 rounded-2xl flex items-center justify-between shadow-sm cursor-pointer"
                data-testid={`card-featured-${dorm.id}`}
              >
                <div>
                  <h3 className="font-bold text-lg text-white mb-1">{dorm.name}</h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-secondary rounded-md text-muted-foreground uppercase tracking-wider">
                    {dorm.type}
                  </span>
                </div>
                <div className="flex flex-col items-center justify-center w-14 h-14 rounded-full bg-secondary/50 border border-border">
                  <span className={cn("font-black text-xl", getScoreColorClass(dorm.vses.overall))}>
                    {dorm.vses.overall.toFixed(1)}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>
    </motion.div>
  );
}