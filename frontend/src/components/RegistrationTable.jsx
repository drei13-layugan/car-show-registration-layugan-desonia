import StatusBadge from './StatusBadge'
import PaymentBadge from './PaymentBadge'
import { formatCurrency, formatDate } from '../utils/format'

const th = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600'

export default function RegistrationTable({ items }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className={th}>Reg. No.</th>
            <th className={th}>Date</th>
            <th className={th}>Participant</th>
            <th className={th}>Car</th>
            <th className={th}>Type</th>
            <th className={th}>Status</th>
            <th className={`${th} text-right`}>Fee / Paid</th>
            <th className={th}>Payment</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {items.map((r) => (
            <tr key={r.id} className="hover:bg-indigo-50/40">
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-semibold text-slate-800">{r.registrationNumber}</td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">{formatDate(r.registrationDate)}</td>
              <td className="px-4 py-3">
                <div className="font-medium text-slate-900">{r.participantName}</div>
                <div className="text-xs text-slate-500">{r.contactNumber || r.email}</div>
              </td>
              <td className="px-4 py-3">
                <div className="text-slate-900">{r.carMakeModel}</div>
                <div className="text-xs text-slate-500">{r.plateNumber}</div>
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-slate-700">{r.registrationType}</td>
              <td className="px-4 py-3"><StatusBadge status={r.status} /></td>
              <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">
                <div className="text-slate-900">{formatCurrency(r.registrationFee)}</div>
                <div className="text-xs text-slate-500">/ {formatCurrency(r.amountPaid)}</div>
              </td>
              <td className="px-4 py-3"><PaymentBadge paymentStatus={r.paymentStatus} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}