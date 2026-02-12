import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts";

const moodData = [
  { name: "Calm", value: 40, color: "#22c55e" },
  { name: "Happy", value: 30, color: "#3b82f6" },
  { name: "Anxious", value: 20, color: "#a855f7" },
  { name: "Tired", value: 10, color: "#71717a" },
];

const stabilityData = [
  { day: "M", score: 65 },
  { day: "T", score: 70 },
  { day: "W", score: 58 },
  { day: "T", score: 85 },
  { day: "F", score: 92 },
  { day: "S", score: 88 },
  { day: "S", score: 95 },
];

export function MonthlyMoods() {
  return (
    <div className="bg-brand-card p-6 rounded-2xl border border-white/5">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold">Monthly Moods</h3>
        <button className="text-brand-text-muted hover:text-white">•••</button>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="w-32 h-32 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={moodData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={60}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
                cornerRadius={5}
              >
                {moodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs text-brand-text-muted">Oct</span>
          </div>
        </div>

        <div className="space-y-3 flex-1">
          {moodData.map((item) => (
            <div key={item.name} className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span>{item.name}</span>
              </div>
              <span className="font-bold">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StabilityTrend() {
  return (
    <div className="bg-brand-card p-6 rounded-2xl border border-white/5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="font-semibold">Stability Trend</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold">Stable</span>
            <span className="text-xs text-brand-primary">Last 7 Days</span>
          </div>
        </div>
        <div className="w-2 h-2 rounded-full bg-brand-primary" />
      </div>

      <div className="h-40">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={stabilityData}>
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.05)' }}
              contentStyle={{ backgroundColor: '#0f1715', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Bar dataKey="score" fill="#22c55e" radius={[4, 4, 0, 0]} opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
