const STYLES = {
  Unpaid: 'bg-red-50 text-red-800 ring-red-300',
  Partial: 'bg-amber-50 text-amber-800 ring-amber-300',
  Paid: 'bg-green-50 text-green-800 ring-green-300',
}

export default function PaymentBadge({ paymentStatus }) {
  const style = STYLES[paymentStatus] ?? STYLES.Unpaid
  return (
    <span className={`inline-block whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style}`}>
      {paymentStatus}
    </span>
  )
}