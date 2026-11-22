const STYLES = {
  Pending: 'bg-slate-100 text-slate-700 ring-slate-300',
  Confirmed: 'bg-blue-50 text-blue-800 ring-blue-300',
  CheckedIn: 'bg-green-50 text-green-800 ring-green-300',
  Cancelled: 'bg-red-50 text-red-800 ring-red-300',
}

const LABELS = { CheckedIn: 'Checked In' }

export default function StatusBadge({ status }) {
  const style = STYLES[status] ?? STYLES.Pending
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style}`}>
      {LABELS[status] ?? status}
    </span>
  )
}