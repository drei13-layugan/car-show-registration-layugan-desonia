export default function KpiCard({ icon, label, value, hint, loading }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between text-sm font-medium text-slate-600">
        <span>{label}</span>
        <span aria-hidden="true" className="text-lg">{icon}</span>
      </div>
      {loading ? (
        <div className="mt-3 h-8 w-24 animate-pulse rounded bg-slate-200" aria-label="Loading" />
      ) : (
        <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
      )}
      {hint && !loading && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}