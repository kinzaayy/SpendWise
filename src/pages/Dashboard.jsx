import { useExpenses } from "../hooks/useExpenses";
import { getTotalSpending, getThisMonthSpending, getTopCategory } from "../utils/expenses";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  const { expenses } = useExpenses();

  const total = getTotalSpending(expenses);
  const thisMonth = getThisMonthSpending(expenses);
  const topCategory = getTopCategory(expenses);
  const recentExpenses = expenses.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-700">Dashboard</h2>
        <p className="text-sm text-slate-400 mt-1">Where is your money going?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Spending" value={`$${total.toFixed(2)}`} />
        <StatCard label="This Month" value={`$${thisMonth.toFixed(2)}`} />
        <StatCard label="Expenses" value={expenses.length} />
        <StatCard label="Top Category" value={topCategory || "—"} />
      </div>

      <div className="bg-white rounded-card border border-slate-100 p-6">
        <h3 className="text-sm font-semibold text-slate-600 mb-4">
          Recent Transactions
        </h3>
        {recentExpenses.length === 0 ? (
          <p className="text-sm text-slate-400">No expenses yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-700">{expense.title}</p>
                  <p className="text-xs text-slate-400">{expense.category}</p>
                </div>
                <span className="text-sm font-medium text-slate-700">
                  ${expense.amount.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}