import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-xl font-semibold text-slate-700">Dashboard</h2>
        <p className="text-sm text-slate-400 mt-1">Where is your money going?</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Spending" value="$0" />
        <StatCard label="This Month" value="$0" />
        <StatCard label="Expenses" value="0" />
        <StatCard label="Top Category" value="—" />
      </div>

      <div className="bg-white rounded-card border border-slate-100 p-6">
        <h3 className="text-sm font-semibold text-slate-600 mb-4">
          Recent Transactions
        </h3>
        <p className="text-sm text-slate-400">No expenses yet.</p>
      </div>
    </div>
  );
}
