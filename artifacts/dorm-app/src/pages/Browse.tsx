import { useState } from "wouter";
import * as React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { dorms } from "@/data/dorms";
import { getScoreColorClass } from "@/lib/score-utils";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Suite-Style", "Traditional", "Apartment"];

export default function Browse() {
  const [activeFilter, setActiveFilter] = React.useState("All");

  const filteredDorms = dorms.filter(d => activeFilter === "All" || d.type === activeFilter);

  return (
    <div className="flex flex-col h-full">
      <div className="pt-12 px-6 pb-4 sticky top-0 bg-background/95 backdrop-blur-xl z-10 border-b border-border">
        <h1 className="text-3xl font-black text-white mb-4">Browse Dorms</h1>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-6 px-6">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all",
                activeFilter === filter 
                  ? "bg-primary text-primary-foreground shadow-md" 
                  : "bg-secondary text-muted-foreground hover:bg-secondary/80"
              )}
              data-testid={`filter-${filter.toLowerCase()}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 flex flex-col gap-4">
        {filteredDorms.map((dorm, i) => (
          <Link key={dorm.id} href={`/dorms/${dorm.id}`}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
              className="bg-card border border-card-border p-5 rounded-2xl flex items-center justify-between cursor-pointer"
              data-testid={`card-dorm-${dorm.id}`}
            >
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-xl text-white">{dorm.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 bg-secondary rounded text-muted-foreground uppercase tracking-wider">
                    {dorm.type}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    Built {dorm.yearBuilt}
                  </span>
                </div>
              </div>
              <div className={cn("flex flex-col items-center justify-center px-4 py-2 rounded-xl bg-secondary/30 border border-border/50", getScoreColorClass(dorm.vses.overall))}>
                <span className="text-[10px] uppercase font-bold opacity-70 mb-0.5">VSES</span>
                <span className="font-black text-2xl leading-none">
                  {dorm.vses.overall.toFixed(1)}
                </span>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}