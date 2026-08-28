# SpendWise

A clean, minimal personal expense tracker built with React, Vite, and Tailwind CSS. Second portfolio project, following [Flow Timer](https://github.com/kinzaayy/Flow-Timer).

## Features

- Dashboard — total spending, this month's spending, expense count, top category, recent transactions
- Add Expense — title, amount, category, date, optional note, with full validation
- Expense List — all expenses shown as title/category/date/amount, with edit and delete
- Edit Expense — update any field, changes reflect immediately everywhere
- Delete Expense — with a confirmation prompt
- Data persists in Local Storage across page reloads
- Client-side routing (Dashboard / Expenses / Analytics) via react-router-dom
- Search and filtering — by title, category, month, with sort (newest/oldest/amount)

## Not yet built

- Analytics charts (category breakdown, monthly trend) — Analytics page is currently a placeholder
- Responsive/polish pass

## Tech Stack

- React
- Vite
- Tailwind CSS
- react-router-dom
- Recharts (installed, not yet used — for the Analytics phase)

## Project Structure

```
src/
  components/    Layout, StatCard, ExpenseForm, ExpenseRow, FilterBar
  hooks/         useExpenses.js — expense CRUD state and logic
  pages/         Dashboard.jsx, ExpenseListPage.jsx, AnalyticsPage.jsx (placeholder)
  utils/         expenses.js — Local Storage persistence, category list, stat aggregation
  App.jsx        route definitions
  main.jsx       React entry point, wraps App in BrowserRouter
```

## Running Locally

```bash
npm install
npm run dev
```

## Roadmap

Following a phased build:

- ✅ **Phase 1 — Foundation:** project setup, routing, layout, navigation, dashboard structure
- ✅ **Phase 2 — Expenses:** add, display, edit, delete, validation
- ✅ **Phase 3 — Organization:** categories, search, filters, sorting
- **Phase 4 — Analytics:** totals (done on dashboard), category breakdown, monthly stats, charts
- **Phase 5 — Persistence:** Local Storage (done), empty states (done)
- **Phase 6 — Polish:** responsive design, UX improvements, error/confirmation states
- **Phase 7 — Portfolio:** README (in progress), screenshots, deployment

Scope is intentionally capped at a polished CRUD + search/filtering + categories + analytics + local persistence + deployment. No backend, database, or authentication in this project — that's reserved for Project #3.