import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getShortcutIndex } from '../lib/shortcutsApi'
import type { ShortcutIndexEntry } from '../lib/types'
import { Panel } from '../ui/Panel'

export function HomePage() {
  const [query, setQuery] = useState('')
  const [apps, setApps] = useState<ShortcutIndexEntry[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setError(null)
        const data = await getShortcutIndex()
        if (!cancelled) setApps(data)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load shortcuts')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const list = apps ?? []
    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter((a) => a.name.toLowerCase().includes(q) || a.id.toLowerCase().includes(q))
  }, [apps, query])

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-strong md:text-4xl">
            Train shortcuts like you train typing
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-white/60">
            Choose an app, see an action, press the correct key combo. Repeat until you finish the
            set.
          </p>
        </div>

        <div className="w-full max-w-md">
          <label className="block text-xs text-white/55">Search apps</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="VS Code, Figma, Vim…"
            className={[
              'mt-2 w-full rounded-xl bg-white/5 px-4 py-3 text-sm text-strong outline-none',
              'ring-1 ring-white/10 placeholder:text-white/35',
              'focus:ring-2 focus:ring-violet-500/60',
            ].join(' ')}
          />
        </div>
      </div>

      {error ? (
        <Panel className="border border-red-500/20 bg-red-500/5">
          <div className="text-sm text-white/80">
            Could not load shortcut packs.{' '}
            <span className="text-white/50">(Check `VITE_SHORTCUTS_BASE_URL`.)</span>
          </div>
          <div className="mt-2 text-xs text-white/45">{error}</div>
        </Panel>
      ) : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {(apps
          ? filtered.map((app) => ({ kind: 'app' as const, app }))
          : Array.from({ length: 6 }, (_, i) => ({ kind: 'skeleton' as const, id: i }))
        ).map((item) => {
          const isSkeleton = item.kind === 'skeleton'
          const id = isSkeleton ? `sk-${item.id}` : item.app.id
          const name = isSkeleton ? 'Loading…' : item.app.name

          return (
            <Link
              key={id}
              to={isSkeleton ? '#' : `/train/${item.app.id}`}
              className={[
                'group relative overflow-hidden rounded-2xl bg-white/5 p-5',
                'ring-1 ring-white/10 transition hover:bg-white/7 hover:ring-white/15',
                isSkeleton ? 'pointer-events-none animate-pulse' : '',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-white/45">
                    {isSkeleton ? ' ' : item.app.id}
                  </div>
                  <div className="mt-1 text-lg font-semibold text-strong">{name}</div>
                </div>
                <div className="rounded-lg bg-white/8 px-2 py-1 text-xs text-white/65 ring-1 ring-white/10">
                  Train
                </div>
              </div>
              <div className="mt-4 text-sm text-white/55">
                {isSkeleton ? ' ' : 'Hotkeys set from JSON pack.'}
              </div>

              <div className="pointer-events-none absolute -right-14 -top-14 size-40 rounded-full bg-violet-500/10 blur-2xl transition group-hover:bg-violet-500/15" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

