import { useState, useEffect, useCallback } from "react";
import { loadExpenses, saveExpenses, generateExpenseId } from "../utils/expenses";

/**
 * Owns the full list of expenses and every operation on it:
 * add, update, delete. Persists to Local Storage on every change.
 * Components just read `expenses` and call the returned actions.
 */
export function useExpenses() {
  const [expenses, setExpenses] = useState(loadExpenses);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  const addExpense = useCallback((data) => {
    const newExpense = {
      id: generateExpenseId(),
      ...data,
    };
    setExpenses((prev) => [newExpense, ...prev]);
  }, []);

  const updateExpense = useCallback((id, data) => {
    setExpenses((prev) =>
      prev.map((expense) => (expense.id === id ? { ...expense, ...data } : expense))
    );
  }, []);

  const deleteExpense = useCallback((id) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  }, []);

  return { expenses, addExpense, updateExpense, deleteExpense };
}