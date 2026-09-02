function formatDate(dateStr) {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function ExpenseRow({ expense, onEdit, onDelete }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 px-4 py-3 bg-white rounded-card border border-slate-100">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-slate-700">{expense.title}</span>
        <span className="text-xs text-slate-400">
          {expense.category} · {formatDate(expense.date)}
        </span>
      </div>

      <div className="flex items-center justify-between sm:justify-end gap-4">
        <span className="text-sm font-semibold text-slate-700">
          ${expense.amount.toFixed(2)}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(expense)}
            className="text-xs text-brand-600 hover:text-brand-700 font-medium"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(expense)}
            className="text-xs text-slate-400 hover:text-red-500 font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}