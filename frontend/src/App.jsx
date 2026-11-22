import RegistrationsPage from './pages/RegistrationsPage'

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-indigo-700 text-white shadow">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight">🚗 Car Show 2027</h1>
            <p className="text-sm text-indigo-200">Registration Dashboard · Sorsogon City Coliseum</p>
          </div>
          <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium">AutoVista Events</span>
        </div>
      </header>
      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6">
        <RegistrationsPage />
      </main>
    </div>
  )
}