# Car Show 2027 — Registration Dashboard (Frontend)

A React (Vite) and Tailwind CSS dashboard that shows car show registrations,
with summary cards, filters and pagination.

## How to run

```bash
cd frontend
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Sample data or the real API

The app can use local sample data or the real C# API. This is controlled in
`frontend/.env.development`:

```
VITE_API_BASE_URL=http://localhost:5205
VITE_USE_SAMPLE=true
```

- `VITE_USE_SAMPLE=true` uses the sample data in `src/api/sample-data.js`. No backend needed.
- `VITE_USE_SAMPLE=false` calls the real API through `src/api/registrationsApi.js`.

After changing this file, stop `npm run dev` and start it again.

To use the real API:
1. Start the backend: `cd backend`, then `dotnet run --project Api`.
2. Copy the URL it prints into `VITE_API_BASE_URL`.
3. Set `VITE_USE_SAMPLE=false` and restart `npm run dev`.

## Folder structure

```
src/
├── api/         registrationsApi.js, sample-data.js, index.js (the switch)
├── hooks/       useDebounce.js
├── components/  KpiCard(s), RegistrationFilters, RegistrationTable, Pagination, StatusBadge, PaymentBadge
├── pages/       RegistrationsPage.jsx (holds the state and loads the data)
├── utils/       format.js (peso and date formatting)
├── App.jsx
└── index.css
```