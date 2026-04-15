import { createFileRoute } from "@tanstack/react-router";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { CategoryBreakdown } from "@/components/dashboard/CategoryBreakdown";
import { RecentTransactions } from "@/components/dashboard/RecentTransactions";

export const Route = createFileRoute("/")({
  component: Dashboard,
  head: () => ({
    meta: [
      { title: "FinTrack — Dashboard" },
      { name: "description", content: "Track your finances, budgets, and bank statements in one place." },
    ],
  }),
});

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Your financial overview at a glance</p>
      </div>
      <StatsCards />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SpendingChart />
        </div>
        <CategoryBreakdown />
      </div>
      <RecentTransactions />
    </div>
  );
}
