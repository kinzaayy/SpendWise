# SpendWise

A clean, minimal personal expense tracker built with React, Vite, and Tailwind CSS. Second portfolio project, following [Flow Timer](https://github.com/kinzaayy/Flow-Timer).

**Live:** [spend-wise-murex-theta.vercel.app](https://spend-wise-murex-theta.vercel.app/)

## Features

- **Dashboard** — total spending, this month's spending, expense count, top category, recent transactions
- **Add Expense** — title, amount, category, date, optional note, with full validation (required title, amount > 0, required category, required date)
- **Expense List** — all expenses as title/category/date/amount, with edit and delete
- **Edit Expense** — update any field, changes reflect immediately everywhere
- **Delete Expense** — with a confirmation prompt
- **Unsaved-changes guard** — closing the add/edit form with unsaved input asks for confirmation before discarding
- **Search and filtering** — by title, category, month, with sort (newest/oldest/amount high-low/amount low-high), all combinable
- **Analytics** — category breakdown (ranked, with $ and % on hover) and monthly spending trend, built with Recharts
- **Responsive layout** — nav and expense rows adapt to narrow screens
- Data persists in Local Storage across page reloads
- Client-side routing (Dashboard / Expenses / Analytics) via react-router-dom, with a Vercel rewrite config so direct links and refreshes on any route work correctly

## Tech Stack

- React
- Vite
- Tailwind CSS
- react-router-dom
- Recharts

## Project Structure

```
src/
  components/    Layout, StatCard, ExpenseForm, ExpenseRow, FilterBar
  hooks/         useExpenses.js — expense CRUD state and Local Storage persistence
  pages/         Dashboard.jsx, ExpenseListPage.jsx, AnalyticsPage.jsx
  utils/         expenses.js — persistence, categories, stat aggregation, filter/sort logic
  App.jsx        route definitions
  main.jsx       React entry point, wraps App in BrowserRouter
vercel.json      rewrite rule so client-side routes don't 404 on direct load
```

## Running Locally

```bash
npm install
npm run dev
```

## Roadmap

- ✅ **Phase 1 — Foundation:** project setup, routing, layout, navigation, dashboard structure
- ✅ **Phase 2 — Expenses:** add, display, edit, delete, validation
- ✅ **Phase 3 — Organization:** categories, search, filters, sorting
- ✅ **Phase 4 — Analytics:** totals, category breakdown, monthly stats, charts
- ✅ **Phase 5 — Persistence:** Local Storage, empty states
- ✅ **Phase 6 — Polish:** responsive nav/rows, unsaved-changes guard (not an exhaustive polish pass — no dark mode or loading states, just these specific fixes)
- ✅ **Phase 7 — Portfolio:** meaningful commit history, deployed on Vercel, this README

Scope is intentionally capped at a polished CRUD + search/filtering + categories + analytics + local persistence + deployment. No backend, database, or authentication in this project — that's reserved for Project #3.