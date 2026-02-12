import { useState } from "react";
import { cn } from "../../lib/utils";

export function MoodSlider() {
  const [value, setValue] = useState(50);

  const getLabel = (val: number) => {
    if (val < 20) return "Low";
    if (val < 40) return "Okay";
    if (val < 60) return "Calm";
    if (val < 80) return "Good";
    return "Great";
  };

  return (
    <div className="flex items-center gap-4 bg-brand-bg/50 px-6 py-3 rounded-full border border-white/5 w-full max-w-xl mx-auto">
      <span className="text-xs uppercase tracking-wider text-brand-text-muted font-semibold w-20 text-right">
        Mood Tone
      </span>
      
      <div className="relative flex-1 h-2 bg-white/10 rounded-full">
        <div 
          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-brand-primary"
          style={{ width: `${value}%` }} 
        />
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div 
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg pointer-events-none transition-all"
          style={{ left: `${value}%`, transform: `translate(-50%, -50%)` }}
        />
      </div>

      <span className={cn(
        "text-sm font-bold w-12 transition-colors",
        value > 60 ? "text-brand-primary" : "text-white"
      )}>
        {getLabel(value)}
      </span>
    </div>
  );
}
