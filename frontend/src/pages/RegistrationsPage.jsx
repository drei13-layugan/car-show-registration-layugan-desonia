import { useEffect, useState } from 'react'
import { getRegistrations, getSummary } from '../api/sample-data'
import useDebounce from '../hooks/useDebounce'
import KpiCards from '../components/KpiCards'
import RegistrationFilters from '../components/RegistrationFilters'
import RegistrationTable from '../components/RegistrationTable'

// This page owns the state. Child components only receive props and call the handlers.
export default function RegistrationsPage() {
  const [searchText, setSearchText] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [data, setData] = useState(null)
  const [summary, setSummary] = useState(null)

  // wait until the user stops typing (~400 ms) before calling the API
  const debouncedSearch = useDebounce(searchText, 400)

  useEffect(() => {
    getSummary().then(setSummary)
  }, [])

  useEffect(() => {
    getRegistrations({ participantName: debouncedSearch, type, status, page: 1, pageSize: 10 }).then(setData)
  }, [debouncedSearch, type, status])

  const handleClear = () => {
    setSearchText('')
    setType('')
    setStatus('')
  }
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
            onSearchChange={setSearchText}
            onTypeChange={setType}
            onStatusChange={setStatus}
            onClear={handleClear}
            hasFilters={hasFilters}
          />
        </div>
        {data ? <RegistrationTable items={data.items} /> : <p className="p-4">Loading…</p>}
      </section>
    </>
  )
}