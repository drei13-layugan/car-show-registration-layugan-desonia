import KpiCard from './KpiCard'
import { formatCurrency, formatNumber } from '../utils/format'

// All values come from GET /api/registrations/summary, never from the rows on the current page.
export default function KpiCards({ summary, loading }) {
  const s = summary ?? {}
  const collectionRate = s.totalFees > 0 ? (s.totalPayments / s.totalFees) * 100 : 0

  const cards = [
    { icon: '📋', label: 'Total Registrations', value: formatNumber(s.totalRegistrations) },
    { icon: '💰', label: 'Total Payments', value: formatCurrency(s.totalPayments), hint: 'Collected so far' },
    { icon: '⚠️', label: 'Uncollected Payments', value: formatCurrency(s.uncollectedPayments), hint: 'Still to collect' },
    { icon: '✅', label: 'Confirmed', value: formatNumber(s.confirmed) },
    { icon: '🏁', label: 'Checked In', value: formatNumber(s.checkedIn) },
    { icon: '⏳', label: 'Pending / Cancelled', value: `${formatNumber(s.pending)} / ${formatNumber(s.cancelled)}` },
    { icon: '📈', label: 'Collection Rate', value: `${collectionRate.toFixed(1)}%`, hint: 'Payments ÷ total fees' },
  ]

  return (
    <section aria-label="Key figures" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((c) => (
        <KpiCard key={c.label} {...c} loading={loading || !summary} />
      ))}
    </section>
  )
}