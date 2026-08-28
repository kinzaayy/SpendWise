import { CATEGORIES } from "../utils/expenses";

const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "amount-desc", label: "Amount: High to Low" },
  { value: "amount-asc", label: "Amount: Low to High" },
];

export default function FilterBar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  month,
  onMonthChange,
  availableMonths,
  sortBy,
  onSortChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <input
        type="text"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by title..."
        className="flex-1 min-w-[160px] px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700"
      />

      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <select
        value={month}
        onChange={(e) => onMonthChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white"
      >
        <option value="">All Months</option>
        {availableMonths.map(({ key, label }) => (
          <option key={key} value={key}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 bg-white"
      >
        {SORT_OPTIONS.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}