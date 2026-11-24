
const PEOPLE = [
  ['Juan Dela Cruz', 'Toyota Supra MK4'],
  ['Maria Santos', 'Honda Civic Type R'],
  ['Pedro Reyes', 'Nissan Skyline GT-R R34'],
  ['Ana Villanueva', 'Mazda RX-7 FD'],
  ['Carlo Mendoza', 'Subaru WRX STI'],
  ['Liza Ramos', 'Mitsubishi Lancer Evo IX'],
  ['Jose Bautista', 'Ford Mustang GT'],
  ['Rina Garcia', 'Chevrolet Camaro SS'],
  ['Miguel Torres', 'BMW M3 E46'],
  ['Katrina Lopez', 'Mercedes-Benz C63 AMG'],
  ['Dante Aquino', 'Toyota AE86 Trueno'],
  ['Grace Fernandez', 'Honda S2000'],
  ['Ramon Castillo', 'Nissan Silvia S15'],
  ['Bea Navarro', 'Volkswagen Golf GTI'],
  ['Paolo Domingo', 'Porsche 911 Carrera'],
  ['Joy Mercado', 'Audi RS3'],
  ['Allan Soriano', 'Dodge Challenger'],
  ['Cathy Dizon', 'Mini Cooper S'],
  ['Rey Salvador', 'Toyota Corolla AE92'],
  ['Nina Pascual', 'Mazda MX-5 Miata'],
  ['Ben Cruz', 'Honda Integra DC2'],
  ['Tessa Ocampo', 'Lexus IS350'],
  ['Victor Manalo', 'Ford Focus RS'],
  ['Irene Valdez', 'Hyundai Veloster N'],
  ['Marco Gutierrez', 'Nissan 350Z'],
  ['Sheila Padilla', 'Toyota GR86'],
  ['Noel Esteban', 'Subaru BRZ'],
]

const TYPES = ['Competitor', 'Exhibitor', 'VIP']
const STATUSES = ['Confirmed', 'CheckedIn', 'Pending', 'Confirmed', 'Cancelled', 'CheckedIn', 'Pending', 'Confirmed', 'CheckedIn']
const PAY_MODES = ['full', 'partial', 'none', 'full', 'full', 'partial', 'none', 'partial', 'full']
const FEES = { Exhibitor: 1500, Competitor: 2500, VIP: 5000 }
const LETTERS = ['ABC', 'XYZ', 'DEF', 'GHI', 'JKL', 'MNO', 'PQR', 'STU', 'VWX']

function paymentStatusOf(fee, paid) {
  if (paid <= 0) return 'Unpaid'
  if (paid >= fee) return 'Paid'
  return 'Partial'
}

const ALL = PEOPLE.map(([name, car], i) => {
  const registrationType = TYPES[i % 3]
  const status = STATUSES[i % 9]
  const registrationFee = FEES[registrationType]
  const mode = status === 'Cancelled' ? 'none' : PAY_MODES[i % 9]
  const amountPaid = mode === 'full' ? registrationFee : mode === 'partial' ? Math.round(registrationFee * 0.4) : 0
  const date = new Date(Date.UTC(2027, 1, 1 + i, i % 8, 30, 0))
  return {
    id: `sample-${String(i + 1).padStart(4, '0')}`,
    registrationNumber: `CS27-${String(i + 1).padStart(4, '0')}`,
    registrationDate: date.toISOString(),
    participantName: name,
    contactNumber: `0917${String(1234500 + i * 37).padStart(7, '0')}`,
    email: `${name.toLowerCase().replace(/[^a-z]+/g, '.')}@example.com`,
    address: `${100 + i} Rizal St., Sorsogon City`,
    carMakeModel: car,
    plateNumber: `${LETTERS[i % 9]} ${1000 + i * 13}`,
    registrationType,
    status,
    registrationFee,
    amountPaid,
    paymentStatus: paymentStatusOf(registrationFee, amountPaid),
  }
})

const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export async function getRegistrations({ participantName = '', type = '', status = '', page = 1, pageSize = 10 } = {}) {
  await delay(600) // pretend to be a network call so the loading state is visible

  const q = participantName.trim().toLowerCase()
  const filtered = ALL.filter(
    (r) =>
      (!q || r.participantName.toLowerCase().includes(q)) &&
      (!type || r.registrationType === type) &&
      (!status || r.status === status),
  )

  const totalCount = filtered.length
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize))
  const start = (page - 1) * pageSize
  return {
    items: filtered.slice(start, start + pageSize),
    page,
    pageSize,
    totalCount,
    totalPages,
  }
}

export async function getSummary() {
  await delay(400)
  const count = (s) => ALL.filter((r) => r.status === s).length
  const totalFees = ALL.reduce((sum, r) => sum + r.registrationFee, 0)
  const totalPayments = ALL.reduce((sum, r) => sum + r.amountPaid, 0)
  return {
    totalRegistrations: ALL.length,
    confirmed: count('Confirmed'),
    checkedIn: count('CheckedIn'),
    pending: count('Pending'),
    cancelled: count('Cancelled'),
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  }
}