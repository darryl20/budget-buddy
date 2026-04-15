import { createFileRoute } from "@tanstack/react-router";
import { accounts, transactions } from "@/lib/mock-data";
import { Landmark, CreditCard, PiggyBank, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const Route = createFileRoute("/accounts")({
  component: AccountsPage,
  head: () => ({
    meta: [
      { title: "FinTrack — Accounts" },
      { name: "description", content: "Manage your bank accounts and view balances." },
    ],
  }),
});

const iconMap = {
  checking: Landmark,
  savings: PiggyBank,
  credit: CreditCard,
};

function AccountsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Accounts</h1>
        <p className="text-sm text-muted-foreground">Your linked bank accounts</p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {accounts.map((acc) => {
          const Icon = iconMap[acc.type];
          return (
            <div key={acc.id} className="glass-card rounded-xl p-5 transition-all hover:glow-primary">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: `${acc.color}15` }}>
                    <Icon className="h-5 w-5" style={{ color: acc.color }} />
                  </div>
                   <div>
                     <p className="text-sm font-semibold">{acc.name}</p>
                     <p className="text-xs text-muted-foreground">{acc.bank} · {acc.accountNumber}</p>
                   </div>
                </div>
              </div>
              <div className="mt-4">
                <p className={`text-2xl font-bold ${acc.balance < 0 ? "text-expense" : ""}`}>
                  {acc.balance < 0 ? "-" : ""}${Math.abs(acc.balance).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Updated {acc.lastUpdated}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Transactions by account */}
      {accounts.map((acc) => {
        const accTx = transactions.filter((t) => t.account === acc.name);
        if (accTx.length === 0) return null;
        return (
          <div key={acc.id}>
            <h2 className="mb-3 text-lg font-semibold">{acc.name}</h2>
            <div className="glass-card rounded-xl divide-y divide-border">
              {accTx.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-7 w-7 items-center justify-center rounded-md ${tx.type === "credit" ? "bg-income/10" : "bg-expense/10"}`}>
                      {tx.type === "credit" ? <ArrowDownRight className="h-3.5 w-3.5 text-income" /> : <ArrowUpRight className="h-3.5 w-3.5 text-expense" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.description}</p>
                      <p className="text-xs text-muted-foreground">{tx.date} · {tx.category}</p>
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
      })}
    </div>
  );
}
