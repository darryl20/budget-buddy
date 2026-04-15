import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { transactions } from "@/lib/mock-data";
import { ArrowUpRight, ArrowDownRight, Search } from "lucide-react";

export const Route = createFileRoute("/transactions")({
  component: TransactionsPage,
  head: () => ({
    meta: [
      { title: "FinTrack — Transactions" },
      { name: "description", content: "View and filter all your transactions." },
    ],
  }),
});

function TransactionsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "credit" | "debit">("all");

  const filtered = transactions.filter((tx) => {
    const matchSearch = tx.description.toLowerCase().includes(search.toLowerCase()) ||
      tx.category.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || tx.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
        <p className="text-sm text-muted-foreground">All your income and expenses</p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-full rounded-lg border border-border bg-input pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring sm:w-72"
          />
        </div>
        <div className="flex gap-1 rounded-lg bg-secondary p-1">
          {(["all", "credit", "debit"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all
                ${filter === f ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {f === "credit" ? "Income" : f === "debit" ? "Expense" : "All"}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-xl">
        <div className="divide-y divide-border">
          {filtered.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-accent/30">
              <div className="flex items-center gap-4">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${tx.type === "credit" ? "bg-income/10" : "bg-expense/10"}`}>
                  {tx.type === "credit" ? (
                    <ArrowDownRight className="h-4 w-4 text-income" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-expense" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{tx.description}</p>
                  <p className="text-xs text-muted-foreground">{tx.date} · {tx.category}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${tx.type === "credit" ? "text-income" : "text-expense"}`}>
                  {tx.type === "credit" ? "+" : "-"}${tx.amount.toLocaleString()}
                </p>
                <p className="text-xs text-muted-foreground">{tx.account}</p>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-sm text-muted-foreground">No transactions found</div>
          )}
        </div>
      </div>
    </div>
  );
}
