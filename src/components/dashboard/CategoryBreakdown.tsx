import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { categoryData } from "@/lib/mock-data";

export function CategoryBreakdown() {
  const total = categoryData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="glass-card rounded-xl p-6 animate-fade-in">
      <h3 className="mb-1 text-base font-semibold">Spending by Category</h3>
      <p className="mb-4 text-sm text-muted-foreground">This month</p>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              strokeWidth={0}
            >
              {categoryData.map((entry, i) => (
                <Cell key={i} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "oklch(0.18 0.02 260)",
                border: "1px solid oklch(0.28 0.02 260)",
                borderRadius: "8px",
                color: "oklch(0.95 0.01 260)",
                fontSize: "12px",
              }}
              formatter={(value: any) => [`$${value}`, undefined]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 space-y-2">
        {categoryData.map((cat) => (
          <div key={cat.name} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: cat.fill }} />
              <span className="text-muted-foreground">{cat.name}</span>
            </div>
            <span className="font-medium">${cat.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
