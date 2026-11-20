import { useEffect, useState } from 'react'
import { getRegistrations, getSummary } from '../api/sample-data'
import KpiCards from '../components/KpiCards'
import RegistrationTable from '../components/RegistrationTable'

export default function RegistrationsPage() {
  const [summary, setSummary] = useState(null)
  const [data, setData] = useState(null)

  useEffect(() => {
    getSummary().then(setSummary)
    getRegistrations({ page: 1, pageSize: 10 }).then(setData)
  }, [])

  return (
    <>
      <KpiCards summary={summary} loading={!summary} />

      <section className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-slate-900">Registrations</h2>
        </div>
        {data ? <RegistrationTable items={data.items} /> : <p className="p-4">Loading…</p>}
      </section>
    </>
  )
}