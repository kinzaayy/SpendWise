import { useExpenses } from "../hooks/useExpenses";
import { getCategoryBreakdown, getMonthlySpending } from "../utils/expenses";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const BAR_COLOR = "#2563eb";

export default function AnalyticsPage() {
  const { expenses } = useExpenses();
  const categoryBreakdown = getCategoryBreakdown(expenses);
  const monthlySpending = getMonthlySpending(expenses);

  if (expenses.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-semibold text-slate-700">Analytics</h2>
        <div className="bg-white rounded-card border border-slate-100 p-8 text-center mt-6">
          <p className="text-sm text-slate-400">
            Add some expenses to see your spending analytics.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-xl font-semibold text-slate-700">Analytics</h2>

      <div className="bg-white rounded-card border border-slate-100 p-6">
        <h3 className="text-sm font-semibold text-slate-600 mb-1">
          Spending by Category
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Ranked by total spent
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={categoryBreakdown} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" tickFormatter={(v) => `$${v}`} />
            <YAxis type="category" dataKey="category" width={90} />
            <Tooltip
              formatter={(value, _name, props) => [
                `$${value.toFixed(2)} (${props.payload.percentage}%)`,
                "Spent",
              ]}
            />
            <Bar dataKey="amount" fill={BAR_COLOR} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-card border border-slate-100 p-6">
        <h3 className="text-sm font-semibold text-slate-600 mb-1">
          Monthly Spending
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Total spent per month
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlySpending}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(v) => `$${v}`} />
            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, "Spent"]} />
            <Bar dataKey="amount" fill={BAR_COLOR} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}