import { Link, NavLink, Route, Routes } from 'react-router-dom'
import { OsProvider } from './state/os'
import { OsToggle } from './ui/OsToggle'
import { HomePage } from './pages/Home'
import { TrainPage } from './pages/Train'
import { ContributePage } from './pages/Contribute'

function App() {
  return (
    <OsProvider>
      <div className="app-shell">
        <header className="sticky top-0 z-10 border-b border-white/10 bg-black/20 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link to="/" className="flex items-center gap-2 no-underline">
              <div className="grid size-8 place-items-center rounded-lg bg-white/10 text-strong ring-1 ring-white/10">
                OS
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold text-strong">OpenShortcut</div>
                <div className="text-xs text-white/55">Trainer</div>
              </div>
            </Link>

            <nav className="hidden items-center gap-4 md:flex">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-sm ${isActive ? 'text-strong' : 'text-white/65'} hover:text-strong`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/contribute"
                className={({ isActive }) =>
                  `text-sm ${isActive ? 'text-strong' : 'text-white/65'} hover:text-strong`
                }
              >
                Contribute
              </NavLink>
            </nav>

            <div className="flex items-center gap-3">
              <OsToggle />
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/train/:appId" element={<TrainPage />} />
            <Route path="/contribute" element={<ContributePage />} />
          </Routes>
        </main>

        <footer className="border-t border-white/10 py-6">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 text-xs text-white/50">
            <div>Monkeytype-style hotkey trainer.</div>
            <a className="hover:text-white/70" href="https://github.com/" target="_blank">
              GitHub
            </a>
          </div>
        </footer>
      </div>
    </OsProvider>
  )
}

export default App
