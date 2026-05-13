import { useEffect, useState } from 'react';

export default function VsesScoreCircle({ score }: { score: number }) {
  const [progress, setProgress] = useState(0);
  const percentage = (score / 5) * 100;
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(percentage);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-[200px] h-[200px] mx-auto my-6 flex items-center justify-center z-10">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
        />
        <circle
          className="text-primary-color transition-all duration-1000 ease-out"
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="100"
          cy="100"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-6xl font-extrabold text-primary-color leading-none tracking-tighter drop-shadow-sm">{score.toFixed(1)}</span>
        <span className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wide">out of 5.0</span>
      </div>
    </div>
  );
}