const inputClass =
  'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200'

export default function RegistrationFilters({
  searchText,
  type,
  status,
  onSearchChange,
  onTypeChange,
  onStatusChange,
  onClear,
  hasFilters,
}) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="search" className="text-xs font-medium text-slate-600">Participant</label>
        <input
          id="search"
          type="search"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="🔍 Search participant name…"
          className={`${inputClass} w-64`}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="type" className="text-xs font-medium text-slate-600">Registration type</label>
        <select id="type" value={type} onChange={(e) => onTypeChange(e.target.value)} className={inputClass}>
          <option value="">All types</option>
          <option value="Exhibitor">Exhibitor</option>
          <option value="Competitor">Competitor</option>
          <option value="VIP">VIP</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-xs font-medium text-slate-600">Status</label>
        <select id="status" value={status} onChange={(e) => onStatusChange(e.target.value)} className={inputClass}>
          <option value="">All statuses</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="CheckedIn">Checked In</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <button
        type="button"
        onClick={onClear}
        disabled={!hasFilters}
        className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-40"
      >
        ✕ Clear filters
      </button>
    </div>
  )
}