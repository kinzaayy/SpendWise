import { useState } from "react";
import { CATEGORIES } from "../utils/expenses";

const EMPTY_FORM = {
  title: "",
  amount: "",
  category: "",
  date: new Date().toISOString().split("T")[0],
  note: "",
};

function validate(form) {
  const errors = {};

  if (!form.title.trim()) {
    errors.title = "Title is required.";
  }

  const amountNum = Number(form.amount);
  if (form.amount === "" || Number.isNaN(amountNum)) {
    errors.amount = "Enter a valid amount.";
  } else if (amountNum <= 0) {
    errors.amount = "Amount must be greater than 0.";
  }

  if (!form.category) {
    errors.category = "Select a category.";
  }

  if (!form.date) {
    errors.date = "Date is required.";
  }

  return errors;
}

export default function ExpenseForm({ initialExpense, onSubmit, onCancel }) {
  const [form, setForm] = useState(
    initialExpense
      ? {
          title: initialExpense.title,
          amount: String(initialExpense.amount),
          category: initialExpense.category,
          date: initialExpense.date,
          note: initialExpense.note || "",
        }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});

  const isEditing = Boolean(initialExpense);

  const isDirty = () => {
    const baseline = initialExpense
      ? {
          title: initialExpense.title,
          amount: String(initialExpense.amount),
          category: initialExpense.category,
          date: initialExpense.date,
          note: initialExpense.note || "",
        }
      : EMPTY_FORM;

    return Object.keys(baseline).some((key) => form[key] !== baseline[key]);
  };

  const handleCancel = () => {
    if (isDirty() && !window.confirm("Discard unsaved changes?")) {
      return;
    }
    onCancel();
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      title: form.title.trim(),
      amount: Number(form.amount),
      category: form.category,
      date: form.date,
      note: form.note.trim(),
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center px-4 z-50"
      onClick={handleCancel}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white rounded-card shadow-lg border border-slate-100 p-6 flex flex-col gap-4"
      >
        <h2 className="text-lg font-semibold text-slate-700">
          {isEditing ? "Edit Expense" : "Add Expense"}
        </h2>

        <div>
          <label className="text-sm text-slate-500">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={handleChange("title")}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-slate-700"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-slate-500">Amount</label>
          <input
            type="number"
            step="0.01"
            value={form.amount}
            onChange={handleChange("amount")}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-slate-700"
          />
          {errors.amount && (
            <p className="text-xs text-red-500 mt-1">{errors.amount}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-slate-500">Category</label>
          <select
            value={form.category}
            onChange={handleChange("category")}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-slate-700 bg-white"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-xs text-red-500 mt-1">{errors.category}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-slate-500">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={handleChange("date")}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-slate-700"
          />
          {errors.date && (
            <p className="text-xs text-red-500 mt-1">{errors.date}</p>
          )}
        </div>

        <div>
          <label className="text-sm text-slate-500">Note (optional)</label>
          <input
            type="text"
            value={form.note}
            onChange={handleChange("note")}
            className="w-full mt-1 px-3 py-2 rounded-lg border border-slate-200 text-slate-700"
          />
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-full bg-brand-600 text-white font-medium hover:bg-brand-700 transition"
          >
            {isEditing ? "Save Changes" : "Add Expense"}
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 px-4 py-2 rounded-full bg-slate-100 text-slate-600 font-medium hover:bg-slate-200 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}