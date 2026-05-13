export function getScoreColorClass(score: number) {
  if (score >= 4.5) return 'text-emerald-400';
  if (score >= 3.5) return 'text-amber-400';
  return 'text-rose-400';
}

export function getScoreBgClass(score: number) {
  if (score >= 4.5) return 'bg-emerald-400';
  if (score >= 3.5) return 'bg-amber-400';
  return 'bg-rose-400';
}

export function getScoreStrokeColor(score: number) {
  if (score >= 4.5) return '#34d399'; // emerald-400
  if (score >= 3.5) return '#fbbf24'; // amber-400
  return '#fb7185'; // rose-400
}