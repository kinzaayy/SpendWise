export default function StatCard({ label, value }) {
  return (
    <div className="bg-white rounded-card border border-slate-100 p-5">
      <p className="text-sm text-slate-400 font-medium">{label}</p>
      <p className="text-2xl font-semibold text-slate-800 mt-1">{value}</p>
    </div>
  );
}