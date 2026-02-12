import { Bell, Calendar } from "lucide-react";
import { WellnessScore } from "../components/analytics/WellnessScore";
import { MonthlyMoods, StabilityTrend } from "../components/analytics/AnalyticsCharts";

export function Analytics() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Wellness Analytics</h1>
          <p className="text-brand-text-muted">Your mental health trends powered by GenAI</p>
        </div>
        <button className="p-2 rounded-full bg-brand-card hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5 text-brand-text-muted" />
        </button>
      </header>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="bg-brand-card rounded-lg p-1 flex gap-1">
          <button className="px-4 py-1.5 bg-brand-primary text-black text-sm font-semibold rounded-md">Last 30 Days</button>
          <button className="px-4 py-1.5 hover:bg-white/5 text-sm rounded-md transition-colors">Quarterly</button>
          <button className="px-4 py-1.5 hover:bg-white/5 text-sm rounded-md transition-colors">Yearly</button>
        </div>
        
        <div className="flex items-center gap-2 bg-brand-card px-3 py-2 rounded-lg border border-white/5 ml-auto">
          <Calendar className="w-4 h-4 text-brand-text-muted" />
          <span className="text-sm">Oct 01 - Oct 31, 2023</span>
        </div>
        
        <button className="px-6 py-2 bg-brand-primary text-black font-semibold rounded-lg hover:bg-brand-secondary transition-colors">
          Weekly AI Report
        </button>
      </div>

      {/* AI Prediction & Wellness Score */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-gradient-to-br from-brand-card to-brand-card/50 p-8 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-6">
              <SparklesIcon className="w-4 h-4 text-brand-primary" />
              <span className="text-xs font-bold text-brand-primary uppercase tracking-wider">AI Predicted Outlook</span>
            </div>
            
            <h2 className="text-3xl font-light mb-8 leading-tight max-w-2xl">
              "Based on your recent entries, your resilience is <span className="text-brand-primary font-normal border-b-2 border-brand-primary/30">trending upward</span>."
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-brand-text-muted leading-relaxed mb-4">
                  Expect a period of stability next week. However, an increase in work-related keywords such as <span className="text-white font-medium">"deadline"</span> and <span className="text-white font-medium">"presentation"</span> suggests proactive rest strategies will be vital.
                </p>
              </div>
              <div className="space-y-6">
                <div>
                  <p className="text-xs text-brand-text-muted uppercase tracking-wider mb-2">Confidence Score</p>
                  <p className="text-4xl font-bold">92%</p>
                </div>
                <div>
                  <p className="text-xs text-brand-text-muted uppercase tracking-wider mb-2">Recommended Focus</p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs">Deep Breathing</span>
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs">Sleep Consistency</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <WellnessScore />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MonthlyMoods />
        
        {/* Identified Stressors */}
        <div className="bg-brand-card p-6 rounded-2xl border border-white/5">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Identified Stressors</h3>
            <span className="px-2 py-1 bg-red-500/10 text-red-500 text-xs rounded border border-red-500/20">High Impact</span>
          </div>
          <p className="text-xs text-brand-text-muted mb-6">Keywords extracted from your journals correlated with lower mood scores.</p>
          
          <div className="flex flex-wrap justify-center gap-3 py-8 bg-brand-bg/30 rounded-xl border border-dashed border-white/5 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-card/20 to-transparent pointer-events-none" />
            <span className="px-4 py-2 bg-red-500/20 text-red-500 rounded-lg border border-red-500/30 text-lg font-medium animate-pulse">Deadlines</span>
            <span className="px-3 py-1 bg-orange-500/20 text-orange-500 rounded-lg border border-orange-500/30">Sleep Quality</span>
            <span className="px-3 py-1 bg-blue-500/20 text-blue-500 rounded-lg border border-blue-500/30">Commute</span>
            <span className="px-2 py-1 bg-white/5 text-brand-text-muted rounded-lg border border-white/10 text-xs">Groceries</span>
            <span className="px-2 py-1 bg-white/5 text-brand-text-muted rounded-lg border border-white/10 text-xs">Social Battery</span>
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 rounded-lg border border-yellow-500/30">Finances</span>
          </div>
        </div>

        <StabilityTrend />
      </div>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );
}
