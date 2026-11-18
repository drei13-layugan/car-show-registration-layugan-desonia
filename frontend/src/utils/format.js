const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' })

export function formatCurrency(value) {
  return peso.format(Number(value ?? 0))
}

export function formatNumber(value) {
  return Number(value ?? 0).toLocaleString('en-US')
}

// "Feb 10, 2027 08:30 AM"
export function formatDate(iso) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  const date = d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
  const time = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  return `${date} ${time}`
}