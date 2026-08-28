export const CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Education",
  "Entertainment",
  "Health",
  "Other",
];

const STORAGE_KEY = "spendwise-expenses";

/**
 * Reads all expenses from Local Storage. Returns an empty array if
 * nothing is saved yet or storage is inaccessible/corrupt.
 */
export function loadExpenses() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Saves the full expenses array.
 */
export function saveExpenses(expenses) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch {
    // Storage might be full or disabled (private browsing) — fail silently,
    // the app still works, it just won't persist across reloads.
  }
}

/**
 * Generates a reasonably unique id for a new expense.
 */
export function generateExpenseId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Sum of all expense amounts.
 */
export function getTotalSpending(expenses) {
  return expenses.reduce((sum, e) => sum + e.amount, 0);
}

/**
 * Sum of expenses whose date falls in the current calendar month/year.
 */
export function getThisMonthSpending(expenses) {
  const now = new Date();
  return expenses
    .filter((e) => {
      const d = new Date(e.date + "T00:00:00");
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);
}

/**
 * Returns the category with the highest total spending, or null if
 * there are no expenses yet.
 */
export function getTopCategory(expenses) {
  if (expenses.length === 0) return null;

  const totals = {};
  for (const e of expenses) {
    totals[e.category] = (totals[e.category] || 0) + e.amount;
  }

  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
}

/**
 * Returns the distinct year-month values present in the expenses,
 * newest first, as { key: "YYYY-MM", label: "August 2026" } objects —
 * for populating a month filter dropdown.
 */
export function getAvailableMonths(expenses) {
  const seen = new Map();

  for (const e of expenses) {
    const key = e.date.slice(0, 7); // "YYYY-MM"
    if (!seen.has(key)) {
      const label = new Date(e.date + "T00:00:00").toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      });
      seen.set(key, label);
    }
  }

  return Array.from(seen.entries())
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([key, label]) => ({ key, label }));
}

/**
 * Applies search, category filter, and month filter, then sorts.
 * sortBy: "newest" | "oldest" | "amount-desc" | "amount-asc"
 */
export function filterAndSortExpenses(expenses, { search, category, month, sortBy }) {
  let result = expenses;

  if (search.trim()) {
    const query = search.trim().toLowerCase();
    result = result.filter((e) => e.title.toLowerCase().includes(query));
  }

  if (category) {
    result = result.filter((e) => e.category === category);
  }

  if (month) {
    result = result.filter((e) => e.date.slice(0, 7) === month);
  }

  const sorted = [...result];
  switch (sortBy) {
    case "oldest":
      sorted.sort((a, b) => a.date.localeCompare(b.date));
      break;
    case "amount-desc":
      sorted.sort((a, b) => b.amount - a.amount);
      break;
    case "amount-asc":
      sorted.sort((a, b) => a.amount - b.amount);
      break;
    case "newest":
    default:
      sorted.sort((a, b) => b.date.localeCompare(a.date));
      break;
  }

  return sorted;
}