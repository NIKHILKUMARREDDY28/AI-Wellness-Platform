import { Save, Eye } from "lucide-react";
import { AICompanion } from "../components/journal/AICompanion";
import { MoodSlider } from "../components/journal/MoodSlider";

export function Journal() {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.20))] md:h-[calc(100vh-theme(spacing.8))] -m-4 md:-m-8">
      {/* Main Writing Area */}
      <div className="flex-1 flex flex-col relative">
        {/* Toolbar */}
        <header className="px-8 py-6 flex justify-between items-center border-b border-white/5">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">Evening Reflection</span>
              <span className="h-1 w-1 rounded-full bg-brand-text-muted/30" />
              <span className="text-xs text-brand-text-muted">October 24, 2023 • 8:42 PM</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-500 text-xs font-medium border border-green-500/20">
              <Save className="w-3 h-3" />
              Saved
            </div>
            
            <button className="flex items-center gap-2 text-brand-text-muted hover:text-white transition-colors text-sm">
              <Eye className="w-4 h-4" />
              Preview
            </button>
            <button className="bg-brand-primary hover:bg-brand-secondary text-black px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2">
              Analyze Entry
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </header>

        {/* Editor */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 max-w-3xl mx-auto w-full">
          <input
            type="text"
            placeholder="Title your entry..."
            className="w-full bg-transparent text-4xl font-bold placeholder:text-brand-text-muted/30 border-none focus:ring-0 outline-none mb-8"
          />
          <textarea
            placeholder="How are you feeling today?"
            className="w-full h-[calc(100%-120px)] bg-transparent resize-none text-lg text-brand-text-muted/80 placeholder:text-brand-text-muted/20 border-none focus:ring-0 outline-none leading-relaxed"
          />
        </div>

        {/* Footer / Mood Slider */}
        <div className="px-8 py-4 border-t border-white/5 bg-brand-bg/95 backdrop-blur-sm absolute bottom-0 w-full z-10">
          <MoodSlider />
        </div>
      </div>

      {/* AI Sidebar */}
      <AICompanion />
    </div>
  );
}
