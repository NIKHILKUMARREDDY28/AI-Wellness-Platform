import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { day: "Mon", mood: 2 },
  { day: "Tue", mood: 4 },
  { day: "Wed", mood: 6 },
  { day: "Thu", mood: 4 },
  { day: "Fri", mood: 7 },
  { day: "Sat", mood: 8 },
  { day: "Sun", mood: 7 },
];

export function MoodChart() {
  return (
    <div className="bg-brand-card p-6 rounded-2xl border border-white/5">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold">Mood Trajectory</h3>
          <p className="text-sm text-brand-text-muted">Last 7 Days</p>
        </div>
        <select className="bg-transparent border border-white/10 rounded-lg px-3 py-1 text-sm text-brand-text-muted">
          <option>Weekly</option>
        </select>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorMood" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#a1a1aa', fontSize: 12 }} 
              dy={10}
            />
            <YAxis 
              hide 
              domain={[0, 10]} 
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1a2e26', border: 'none', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area
              type="monotone"
              dataKey="mood"
              stroke="#22c55e"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorMood)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
