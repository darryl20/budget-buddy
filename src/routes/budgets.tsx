import { createFileRoute } from "@tanstack/react-router";
import { budgets } from "@/lib/mock-data";

export const Route = createFileRoute("/budgets")({
  component: BudgetsPage,
  head: () => ({
    meta: [
      { title: "FinTrack — Budgets" },
      { name: "description", content: "Set and track your spending budgets by category." },
    ],
  }),
});

function BudgetsPage() {
  const totalLimit = budgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = budgets.reduce((s, b) => s + b.spent, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Budgets</h1>
        <p className="text-sm text-muted-foreground">Track your spending against budget goals</p>
      </div>

      <div className="glass-card rounded-xl p-5">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Total Budget Used</p>
            <p className="mt-1 text-3xl font-bold">${totalSpent.toLocaleString()}<span className="text-lg text-muted-foreground"> / ${totalLimit.toLocaleString()}</span></p>
          </div>
          <span className={`text-sm font-semibold ${totalSpent / totalLimit > 0.85 ? "text-expense" : "text-income"}`}>
            {((totalSpent / totalLimit) * 100).toFixed(0)}%
          </span>
        </div>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${Math.min((totalSpent / totalLimit) * 100, 100)}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {budgets.map((budget) => {
          const pct = (budget.spent / budget.limit) * 100;
          const isOver = pct >= 90;
          return (
            <div key={budget.id} className="glass-card rounded-xl p-5">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">{budget.category}</h3>
                <span className={`text-xs font-medium ${isOver ? "text-expense" : "text-muted-foreground"}`}>
                  {pct.toFixed(0)}%
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${isOver ? "bg-expense" : "bg-primary"}`}
                  style={{ width: `${Math.min(pct, 100)}%` }}
                />
              </div>
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>${budget.spent.toLocaleString()} spent</span>
                <span>${budget.limit.toLocaleString()} limit</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
