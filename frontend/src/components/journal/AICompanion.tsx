import { Sparkles, Lightbulb, MessageSquare, RefreshCw } from "lucide-react";

export function AICompanion() {
  return (
    <div className="w-80 bg-brand-card border-l border-white/5 p-6 flex flex-col h-full hidden lg:flex">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-brand-primary" />
          <h2 className="font-semibold">AI Companion</h2>
        </div>
        <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
          <RefreshCw className="w-4 h-4 text-brand-text-muted" />
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto pr-2 custom-scrollbar">
        {/* Reflection Prompt */}
        <div className="bg-brand-bg/50 border border-brand-primary/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-brand-primary/10 rounded-lg">
              <MessageSquare className="w-4 h-4 text-brand-primary" />
            </div>
            <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">Reflection</span>
          </div>
          <p className="text-sm mb-4 leading-relaxed">
            "You mentioned feeling <span className="text-white font-medium">stressed about work</span> yesterday. How is that sitting with you today?"
          </p>
          <div className="flex gap-2">
            <button className="flex-1 py-2 bg-brand-card border border-white/10 hover:border-brand-primary/50 text-xs rounded-lg transition-colors">
              Better
            </button>
            <button className="flex-1 py-2 bg-brand-card border border-white/10 hover:border-brand-primary/50 text-xs rounded-lg transition-colors">
              Same
            </button>
          </div>
        </div>

        {/* Suggestion */}
        <div className="bg-brand-bg/50 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-1.5 bg-blue-500/10 rounded-lg">
              <Lightbulb className="w-4 h-4 text-blue-500" />
            </div>
            <span className="text-xs font-bold text-blue-500 uppercase tracking-wider">Suggestion</span>
          </div>
          <p className="text-sm text-brand-text-muted">
            Try listing <span className="text-white">3 small things</span> that brought you a sense of peace this morning.
          </p>
        </div>

        {/* Weekly Focus */}
        <div className="bg-brand-bg/50 border border-white/5 rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-brand-text-muted uppercase tracking-wider">Weekly Focus</span>
          </div>
          <div className="h-24 bg-gradient-to-br from-brand-primary/20 to-transparent rounded-lg flex items-end p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div>
              <p className="text-2xl font-bold">Anxiety</p>
              <p className="text-xs text-brand-primary flex items-center gap-1">
                ▼ 12% <span className="text-brand-text-muted">vs last week</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-auto pt-6">
        <button className="w-full py-3 border border-dashed border-white/20 rounded-xl text-sm text-brand-text-muted hover:text-white hover:border-white/40 transition-colors flex items-center justify-center gap-2">
          <span>+</span> Generate New Prompts
        </button>
      </div>
    </div>
  );
}
