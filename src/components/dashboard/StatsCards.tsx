import { TrendingUp, TrendingDown, Wallet, CreditCard } from "lucide-react";

const stats = [
  {
    label: "Total Balance",
    value: "$63,061.10",
    change: "+2.4%",
    positive: true,
    icon: Wallet,
    gradient: "stat-gradient",
  },
  {
    label: "Monthly Income",
    value: "$6,912.50",
    change: "+12.3%",
    positive: true,
    icon: TrendingUp,
    gradient: "income-gradient",
  },
  {
    label: "Monthly Expenses",
    value: "$3,197.49",
    change: "-8.1%",
    positive: true,
    icon: TrendingDown,
    gradient: "expense-gradient",
  },
  {
    label: "Active Cards",
    value: "4",
    change: "All synced",
    positive: true,
    icon: CreditCard,
    gradient: "stat-gradient",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`glass-card rounded-xl p-5 ${stat.gradient} animate-slide-up`}
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{stat.label}</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="mt-3 text-2xl font-bold tracking-tight">{stat.value}</div>
          <div className={`mt-1 text-xs font-medium ${stat.positive ? "text-income" : "text-expense"}`}>
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  );
}
