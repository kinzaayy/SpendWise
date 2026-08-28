import { useState, useMemo } from "react";
import { useExpenses } from "../hooks/useExpenses";
import ExpenseRow from "../components/ExpenseRow";
import ExpenseForm from "../components/ExpenseForm";
import FilterBar from "../components/FilterBar";
import { getAvailableMonths, filterAndSortExpenses } from "../utils/expenses";

export default function ExpenseListPage() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [month, setMonth] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const availableMonths = useMemo(() => getAvailableMonths(expenses), [expenses]);

  const filteredExpenses = useMemo(
    () => filterAndSortExpenses(expenses, { search, category, month, sortBy }),
    [expenses, search, category, month, sortBy]
  );

  const openAddForm = () => {
    setEditingExpense(null);
    setIsFormOpen(true);
  };

  const openEditForm = (expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingExpense(null);
  };

  const handleSubmit = (data) => {
    if (editingExpense) {
      updateExpense(editingExpense.id, data);
    } else {
      addExpense(data);
    }
    closeForm();
  };

  const handleDelete = (expense) => {
    if (window.confirm(`Delete "${expense.title}"? This can't be undone.`)) {
      deleteExpense(expense.id);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-700">Expenses</h2>
        <button
          onClick={openAddForm}
          className="px-4 py-2 rounded-full bg-brand-600 text-white text-sm font-medium hover:bg-brand-700 transition"
        >
          + Add Expense
        </button>
      </div>

      {expenses.length > 0 && (
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          month={month}
          onMonthChange={setMonth}
          availableMonths={availableMonths}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      )}

      {expenses.length === 0 ? (
        <div className="bg-white rounded-card border border-slate-100 p-8 text-center">
          <p className="text-sm text-slate-400">
            No expenses yet. Add your first one to get started.
          </p>
        </div>
      ) : filteredExpenses.length === 0 ? (
        <div className="bg-white rounded-card border border-slate-100 p-8 text-center">
          <p className="text-sm text-slate-400">
            No expenses match your filters.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {filteredExpenses.map((expense) => (
            <ExpenseRow
              key={expense.id}
              expense={expense}
              onEdit={openEditForm}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {isFormOpen && (
        <ExpenseForm
          initialExpense={editingExpense}
          onSubmit={handleSubmit}
          onCancel={closeForm}
        />
      )}
    </div>
  );
}