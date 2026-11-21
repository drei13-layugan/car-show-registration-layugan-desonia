const btn =
  'min-w-9 rounded-lg border px-3 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:cursor-not-allowed disabled:opacity-40'

// show up to 5 page numbers around the current page
function pageWindow(page, totalPages) {
  const size = Math.min(5, totalPages)
  let start = Math.max(1, page - Math.floor(size / 2))
  if (start + size - 1 > totalPages) start = totalPages - size + 1
  return Array.from({ length: size }, (_, i) => start + i)
}

export default function Pagination({ page, pageSize, totalCount, totalPages, loading, onPageChange, onPageSizeChange }) {
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalCount)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
      <nav aria-label="Pagination" className="flex items-center gap-1">
        <button
          type="button"
          className={`${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
          onClick={() => onPageChange(page - 1)}
          disabled={loading || page <= 1}
        >
          ‹ Prev
        </button>
        {pageWindow(page, totalPages).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            disabled={loading}
            aria-current={p === page ? 'page' : undefined}
            className={`${btn} ${
              p === page
                ? 'border-indigo-600 bg-indigo-600 text-white'
                : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          className={`${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
          onClick={() => onPageChange(page + 1)}
          disabled={loading || page >= totalPages}
        >
          Next ›
        </button>
      </nav>

      <p className="text-sm text-slate-600">
        Showing {from}–{to} of {totalCount}
      </p>

      <div className="flex items-center gap-2 text-sm text-slate-600">
        <label htmlFor="pageSize">Per page</label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          disabled={loading}
          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 disabled:opacity-40"
        >
          {[5, 10, 20].map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
      </div>
    </div>
  )
}