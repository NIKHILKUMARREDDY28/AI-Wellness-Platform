import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Book, BarChart2, Settings, Leaf } from "lucide-react";
import { cn } from "../../lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/overview" },
  { icon: Book, label: "Journal", path: "/journal" },
  { icon: BarChart2, label: "Insights", path: "/analytics" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-brand-card flex flex-col border-r border-white/5 hidden md:flex">
      <div className="p-6 flex items-center gap-2">
        <Leaf className="w-6 h-6 text-brand-primary" />
        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
          MindLeaf
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive
                  ? "bg-brand-primary/10 text-brand-primary font-medium"
                  : "text-brand-text-muted hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-brand-primary to-blue-500 flex items-center justify-center text-black font-bold">
            SJ
          </div>
          <div>
            <p className="text-sm font-medium">Sarah Jensen</p>
            <p className="text-xs text-brand-text-muted">Free Plan</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
