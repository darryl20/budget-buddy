import { Link, useLocation } from "@tanstack/react-router";
import {
  LayoutDashboard,
  ArrowLeftRight,
  Landmark,
  Upload,
  PiggyBank,
  Settings,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/accounts", label: "Accounts", icon: Landmark },
  { to: "/budgets", label: "Budgets", icon: PiggyBank },
  { to: "/upload", label: "Upload", icon: Upload },
] as const;

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-30 flex h-screen w-64 flex-col border-r border-border bg-sidebar px-4 py-6">
      <div className="mb-8 flex items-center gap-3 px-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary glow-primary">
          <TrendingUp className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold tracking-tight text-foreground">FinTrack</span>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                ${isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
            >
              <item.icon className="h-4.5 w-4.5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-border pt-4">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:bg-accent hover:text-foreground"
        >
          <Settings className="h-4.5 w-4.5" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
