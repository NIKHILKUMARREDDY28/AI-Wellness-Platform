import { ArrowRight, Bell, Flame, BookOpen, Smile } from "lucide-react";
import { Link } from "react-router-dom";
import { MoodChart } from "../components/dashboard/MoodChart";
import { cn } from "../lib/utils";

const stats = [
  { label: "Current Streak", value: "12 Days", icon: Flame, color: "text-orange-500", bg: "bg-orange-500/10" },
  { label: "Total Reflections", value: "48 Entries", icon: BookOpen, color: "text-brand-primary", bg: "bg-brand-primary/10" },
  { label: "Weekly Avg", value: "Positive", icon: Smile, color: "text-blue-500", bg: "bg-blue-500/10" },
];

const recommendations = [
  { title: "5-Min Breathing Reset", type: "Audio Guide", time: "5 min", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=100&h=100&fit=crop" },
  { title: "Understanding Anxiety", type: "Article", time: "3 min read", image: "https://images.unsplash.com/photo-1456406110374-8c4b5ca358b7?w=100&h=100&fit=crop" },
  { title: "Sleep Hygiene 101", type: "Video", time: "8 min", image: "https://images.unsplash.com/photo-1511296933631-18b5f0008347?w=100&h=100&fit=crop" },
];

export function Dashboard() {
  const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-brand-text-muted mb-1">{today}</p>
          <h1 className="text-3xl font-bold">Good morning, Sarah.</h1>
        </div>
        <button className="p-2 rounded-full bg-brand-card hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5 text-brand-text-muted" />
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-brand-card p-6 rounded-2xl border border-white/5 flex items-center gap-4">
            <div className={cn("p-3 rounded-xl", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm text-brand-text-muted uppercase tracking-wider">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Action Card */}
          <div className="bg-brand-card p-8 rounded-2xl border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-primary/10 transition-colors duration-500" />
            
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="max-w-md">
                <span className="inline-block px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-semibold mb-4">
                  DAILY CHECK-IN
                </span>
                <h2 className="text-2xl font-bold mb-2">Ready to clear your mind?</h2>
                <p className="text-brand-text-muted">
                  Take a moment to reflect on your thoughts. Your mind is a garden that needs tending.
                </p>
              </div>
              <Link
                to="/journal"
                className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-black font-semibold rounded-xl hover:bg-brand-secondary transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Start Journaling
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Chart */}
          <MoodChart />
        </div>

        {/* Right Sidebar / Recommendations */}
        <div className="space-y-6">
          {/* AI Insight */}
          <div className="bg-gradient-to-br from-brand-card to-brand-primary/5 p-6 rounded-2xl border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-primary">Daily AI Insight</span>
            </div>
            <p className="text-lg font-medium mb-4">
              "Based on your sleep patterns and yesterday's entry, you might feel a dip in energy around 2 PM."
            </p>
            <div className="bg-black/20 p-4 rounded-xl">
              <p className="text-sm text-brand-primary mb-1 font-medium">Recommendation</p>
              <p className="text-sm text-brand-text-muted">
                Consider a 10-minute walk or a hydration break this afternoon to maintain focus.
              </p>
            </div>
          </div>

          {/* Recommended Content */}
          <div className="bg-brand-card p-6 rounded-2xl border border-white/5">
            <h3 className="font-semibold mb-4">Recommended for You</h3>
            <div className="space-y-4">
              {recommendations.map((item) => (
                <div key={item.title} className="flex gap-4 group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-xl transition-colors">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-medium group-hover:text-brand-primary transition-colors">{item.title}</h4>
                    <p className="text-xs text-brand-text-muted">{item.type} • {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
