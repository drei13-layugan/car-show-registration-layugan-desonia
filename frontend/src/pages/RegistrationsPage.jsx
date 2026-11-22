import { useEffect, useState } from 'react'
import { getRegistrations, getSummary } from '../api/sample-data'
import useDebounce from '../hooks/useDebounce'
import KpiCards from '../components/KpiCards'
import RegistrationFilters from '../components/RegistrationFilters'
import RegistrationTable from '../components/RegistrationTable'
import Pagination from '../components/Pagination'


export default function RegistrationsPage() {
  const [searchText, setSearchText] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = useState(null)
  const [summary, setSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  
  const debouncedSearch = useDebounce(searchText, 400)

  useEffect(() => {
    getSummary().then(setSummary)
  }, [])

  useEffect(() => {
    let ignore = false // ignore answers from outdated requests
    setLoading(true)
    getRegistrations({ participantName: debouncedSearch, type, status, page, pageSize })
      .then((result) => {
        if (!ignore) setData(result)
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })
    return () => {
      ignore = true
    }
  }, [debouncedSearch, type, status, page, pageSize])

  
  const handleSearchChange = (value) => { setSearchText(value); setPage(1) }
  const handleTypeChange = (value) => { setType(value); setPage(1) }
  const handleStatusChange = (value) => { setStatus(value); setPage(1) }
  const handlePageSizeChange = (value) => { setPageSize(value); setPage(1) }
  const handleClear = () => { setSearchText(''); setType(''); setStatus(''); setPage(1) }

  const hasFilters = searchText !== '' || type !== '' || status !== ''

  return (
    <>
      <KpiCards summary={summary} loading={!summary} />

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

        {data ? <RegistrationTable items={data.items} /> : <p className="p-4">Loading…</p>}

        {data && data.totalCount > 0 && (
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