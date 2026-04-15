import { transactions } from "@/lib/mock-data";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function RecentTransactions() {
  const recent = transactions.slice(0, 7);

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold">Recent Transactions</h3>
          <p className="text-sm text-muted-foreground">Latest activity</p>
        </div>
        <Link to="/transactions" className="text-sm font-medium text-primary hover:underline">
          View all
        </Link>
      </div>
      <div className="space-y-1">
        {recent.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between rounded-lg px-3 py-2.5 transition-colors hover:bg-accent/50">
            <div className="flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${tx.type === "credit" ? "bg-income/10" : "bg-expense/10"}`}>
                {tx.type === "credit" ? (
                  <ArrowDownRight className="h-4 w-4 text-income" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 text-expense" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{tx.category} · {tx.account}</p>
              </div>
            </div>
            <span className={`text-sm font-semibold ${tx.type === "credit" ? "text-income" : "text-expense"}`}>
              {tx.type === "credit" ? "+" : "-"}${tx.amount.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
