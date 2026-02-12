import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Score", value: 85 },
  { name: "Remaining", value: 15 },
];

const COLORS = ["#22c55e", "#1a2e26"];

export function WellnessScore() {
  return (
    <div className="bg-brand-card p-8 rounded-2xl border border-white/5 relative flex flex-col items-center justify-center text-center">
      <h3 className="text-brand-text-muted mb-6">Overall Wellness Score</h3>
      
      <div className="relative w-48 h-48 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              startAngle={90}
              endAngle={450}
              dataKey="value"
              stroke="none"
              cornerRadius={10}
            >
              {data.map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-5xl font-bold">85</span>
          <span className="text-xs text-brand-brand-primary flex items-center gap-1 mt-1 text-green-500">
            +4% this week
          </span>
        </div>
      </div>

      <p className="text-xs text-brand-text-muted max-w-[200px]">
        You're in the top 15% of users for consistent journaling this month.
      </p>
    </div>
  );
}
