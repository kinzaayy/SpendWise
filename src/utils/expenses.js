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