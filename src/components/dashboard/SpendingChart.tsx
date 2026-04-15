import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { monthlyData } from "@/lib/mock-data";

export function SpendingChart() {
  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <h3 className="mb-1 text-base font-semibold">Income vs Expenses</h3>
      <p className="mb-6 text-sm text-muted-foreground">Last 6 months overview</p>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={monthlyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.19 160)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="oklch(0.72 0.19 160)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.63 0.24 25)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="oklch(0.63 0.24 25)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 260)" vertical={false} />
            <XAxis dataKey="month" tick={{ fill: "oklch(0.6 0.02 260)", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "oklch(0.6 0.02 260)", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.18 0.02 260)",
                border: "1px solid oklch(0.28 0.02 260)",
                borderRadius: "8px",
                color: "oklch(0.95 0.01 260)",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, undefined]}
            />
            <Area type="monotone" dataKey="income" stroke="oklch(0.72 0.19 160)" fill="url(#incomeGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="expenses" stroke="oklch(0.63 0.24 25)" fill="url(#expenseGrad)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
