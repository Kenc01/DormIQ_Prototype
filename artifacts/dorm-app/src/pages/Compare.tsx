import * as React from "react";
import { dorms } from "@/data/dorms";
import { getScoreColorClass } from "@/lib/score-utils";
import { cn } from "@/lib/utils";

export default function Compare() {
  const [dorm1Id, setDorm1Id] = React.useState<string>(dorms[0].id);
  const [dorm2Id, setDorm2Id] = React.useState<string>(dorms[1].id);

  const d1 = dorms.find(d => d.id === dorm1Id)!;
  const d2 = dorms.find(d => d.id === dorm2Id)!;

  const categories = [
    { key: "overall", label: "Overall VSES" },
    { key: "vibes", label: "Vibes" },
    { key: "safety", label: "Safety" },
    { key: "environment", label: "Environment" },
    { key: "services", label: "Services" },
  ] as const;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-black text-white mb-8 mt-6 text-center">Compare Dorms</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">Dorm A</label>
          <select 
            className="w-full bg-secondary text-white font-bold p-3 rounded-xl border border-border outline-none appearance-none"
            value={dorm1Id}
            onChange={(e) => setDorm1Id(e.target.value)}
            data-testid="select-dorm-1"
          >
            {dorms.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-1">Dorm B</label>
          <select 
            className="w-full bg-secondary text-white font-bold p-3 rounded-xl border border-border outline-none appearance-none"
            value={dorm2Id}
            onChange={(e) => setDorm2Id(e.target.value)}
            data-testid="select-dorm-2"
          >
            {dorms.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </div>
      </div>

      <div className="bg-card border border-card-border rounded-3xl overflow-hidden shadow-sm">
        {categories.map((cat, i) => {
          const s1 = d1.vses[cat.key];
          const s2 = d2.vses[cat.key];
          const isOverall = cat.key === "overall";
          
          return (
            <div key={cat.key} className={cn("p-4 border-b border-border last:border-0", isOverall && "bg-secondary/30 pb-6")}>
              <div className="text-center mb-3">
                <span className={cn("uppercase tracking-widest text-muted-foreground", isOverall ? "text-sm font-black text-white" : "text-[10px] font-bold")}>
                  {cat.label}
                </span>
              </div>
              <div className="flex justify-between items-center px-4">
                <div className={cn(
                  "px-4 py-2 rounded-xl text-center min-w-[80px]",
                  s1 > s2 ? "bg-emerald-500/10 border border-emerald-500/20" : "",
                  s1 === s2 ? "bg-secondary border border-border" : ""
                )}>
                  <span className={cn("font-black", isOverall ? "text-3xl" : "text-xl", getScoreColorClass(s1))}>
                    {s1.toFixed(1)}
                  </span>
                </div>
                
                <div className="text-muted-foreground/30 font-black text-xl">vs</div>

                <div className={cn(
                  "px-4 py-2 rounded-xl text-center min-w-[80px]",
                  s2 > s1 ? "bg-emerald-500/10 border border-emerald-500/20" : "",
                  s1 === s2 ? "bg-secondary border border-border" : ""
                )}>
                  <span className={cn("font-black", isOverall ? "text-3xl" : "text-xl", getScoreColorClass(s2))}>
                    {s2.toFixed(1)}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}