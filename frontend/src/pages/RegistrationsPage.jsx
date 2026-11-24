import { useEffect, useState } from 'react'
import { getRegistrations, getSummary } from '../api'
import useDebounce from '../hooks/useDebounce'
import KpiCards from '../components/KpiCards'
import RegistrationFilters from '../components/RegistrationFilters'
import RegistrationTable from '../components/RegistrationTable'
import Pagination from '../components/Pagination'


export default function RegistrationsPage() {
  // filters
  const [searchText, setSearchText] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  // paging
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  // data
  const [data, setData] = useState(null)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

 
  const debouncedSearch = useDebounce(searchText, 400)

 
  useEffect(() => {
    let ignore = false // ignore answers from outdated requests
    setLoading(true)
    setError('')
    getRegistrations({ participantName: debouncedSearch, type, status, page, pageSize })
      .then((result) => {
        if (!ignore) setData(result)
      })
      .catch((err) => {
        if (!ignore) setError(err.message || 'Cannot reach the API.')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [debouncedSearch, type, status, page, pageSize, reloadKey])

  
  useEffect(() => {
    let ignore = false
    getSummary()
      .then((result) => {
        if (!ignore) setSummary(result)
      })
      .catch((err) => {
        if (!ignore) setError(err.message || 'Cannot reach the API.')
      })
    return () => {
      ignore = true
    }
  }, [reloadKey])

 
  const handleSearchChange = (value) => { setSearchText(value); setPage(1) }
  const handleTypeChange = (value) => { setType(value); setPage(1) }
  const handleStatusChange = (value) => { setStatus(value); setPage(1) }
  const handlePageSizeChange = (value) => { setPageSize(value); setPage(1) }
  const handleClear = () => { setSearchText(''); setType(''); setStatus(''); setPage(1) }
  const handleRetry = () => setReloadKey((k) => k + 1)

  const hasFilters = searchText !== '' || type !== '' || status !== ''
  const items = data?.items ?? []

   return (
    <>
      <KpiCards summary={summary} loading={loading && !summary} />

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="space-y-4 p-4">
          <h2 className="text-lg font-semibold text-slate-900">Registrations</h2>
          <RegistrationFilters
            searchText={searchText}
            type={type}
            status={status}
            onSearchChange={handleSearchChange}
            onTypeChange={handleTypeChange}
            onStatusChange={handleStatusChange}
            onClear={handleClear}
            hasFilters={hasFilters}
          />
        </div>

        {error ? (
          <div role="alert" className="border-t border-slate-200 px-4 py-12 text-center">
            <p className="font-medium text-red-700">⚠️ {error}</p>
            <button
              type="button"
              onClick={handleRetry}
              className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              ↻ Try again
            </button>
          </div>
        ) : loading && !data ? (
          <p className="border-t border-slate-200 px-4 py-12 text-center text-slate-600">Loading registrations…</p>
        ) : items.length === 0 && !loading ? (
          <div className="border-t border-slate-200 px-4 py-12 text-center">
            <p className="text-slate-700">No registrations match your filters.</p>
            <button
              type="button"
              onClick={handleClear}
              className="mt-4 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            >
              ✕ Clear filters
            </button>
          </div>
        ) : (
          <div className={loading ? 'opacity-50 transition-opacity' : 'transition-opacity'} aria-busy={loading}>
            {loading && (
              <p className="border-t border-slate-200 px-4 py-2 text-sm text-slate-600">Loading registrations…</p>
            )}
            <RegistrationTable items={items} />
          </div>
        )}

        {!error && data && data.totalCount > 0 && (
          <Pagination
            page={data.page}
            pageSize={data.pageSize}
            totalCount={data.totalCount}
            totalPages={data.totalPages}
            loading={loading}
            onPageChange={setPage}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </section>
    </>
  )
}