import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getShortcutPack } from '../lib/shortcutsApi'
import type { Shortcut, ShortcutPack } from '../lib/types'
import { eventToCombo, comboEquals, normalizeExpectedKey } from '../lib/keyboard'
import { shuffle } from '../lib/random'
import { useOs } from '../state/os'
import { Panel } from '../ui/Panel'
import { ProgressBar } from '../ui/ProgressBar'
import { KeyCap } from '../ui/KeyCap'

type Hit = 'idle' | 'good' | 'bad'

function keysForOs(s: Shortcut, os: 'mac' | 'windows' | 'linux') {
  return s.keys[os] ?? (os === 'linux' ? s.keys.windows : undefined) ?? s.keys.windows ?? s.keys.mac
}

function shouldIgnoreTarget(target: EventTarget | null) {
  const el = target as HTMLElement | null
  if (!el) return false
  const tag = el.tagName?.toLowerCase()
  if (tag === 'input' || tag === 'textarea' || tag === 'select') return true
  if (el.isContentEditable) return true
  return false
}

export function TrainPage() {
  const { appId } = useParams()
  const { os } = useOs()

  const [pack, setPack] = useState<ShortcutPack | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [queue, setQueue] = useState<Shortcut[]>([])
  const [idx, setIdx] = useState(0)
  const [hit, setHit] = useState<Hit>('idle')
  const [last, setLast] = useState<string[] | null>(null)

  const hitTimer = useRef<number | null>(null)
  const advanceTimer = useRef<number | null>(null)

  useEffect(() => {
    if (!appId) return
    let cancelled = false
    ;(async () => {
      try {
        setError(null)
        setPack(null)
        const data = await getShortcutPack(appId)
        if (cancelled) return
        setPack(data)
        setQueue(shuffle(data.shortcuts))
        setIdx(0)
        setHit('idle')
        setLast(null)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : 'Failed to load pack')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [appId])

  useEffect(() => {
    return () => {
      if (hitTimer.current) window.clearTimeout(hitTimer.current)
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current)
    }
  }, [])

  const current = queue[idx]
  const expectedRaw = current ? keysForOs(current, os) : null
  const expected = useMemo(() => {
    if (!expectedRaw) return null
    return expectedRaw.map((k) => normalizeExpectedKey(k, os))
  }, [expectedRaw, os])

  const progress = queue.length > 0 ? idx / queue.length : 0
  const done = queue.length > 0 && idx >= queue.length

  useEffect(() => {
    if (!current || !expected) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (shouldIgnoreTarget(e.target)) return

      const combo = eventToCombo(e, os)
      if (combo.length === 0) return
      e.preventDefault()

      const actual = combo.map((k) => normalizeExpectedKey(k, os))
      setLast(actual)

      const ok = comboEquals(actual, expected)
      if (hitTimer.current) window.clearTimeout(hitTimer.current)
      if (advanceTimer.current) window.clearTimeout(advanceTimer.current)

      if (ok) {
        setHit('good')
        advanceTimer.current = window.setTimeout(() => {
          setHit('idle')
          setIdx((i) => i + 1)
        }, 280)
      } else {
        setHit('bad')
        hitTimer.current = window.setTimeout(() => setHit('idle'), 500)
      }
    }

    window.addEventListener('keydown', onKeyDown, { passive: false })
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [current, expected, os])

  const restart = () => {
    if (!pack) return
    setQueue(shuffle(pack.shortcuts))
    setIdx(0)
    setHit('idle')
    setLast(null)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs text-white/50">
            <Link className="hover:text-white/70" to="/">
              Home
            </Link>
            <span>/</span>
            <span className="text-white/70">{pack?.name ?? appId}</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-strong md:text-4xl">
            {pack?.name ?? 'Loading…'}
          </h1>
          <p className="mt-2 text-sm text-white/60">
            Press the correct combo. We’ll move forward on a correct hit.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={restart}
            className="rounded-xl bg-white/6 px-4 py-2 text-sm text-white/75 ring-1 ring-white/10 hover:bg-white/8 hover:text-white/85"
          >
            Restart
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <ProgressBar value={done ? 1 : progress} />
        <div className="flex items-center justify-between text-xs text-white/45">
          <div>
            {queue.length > 0 ? (
              <>
                {Math.min(idx + 1, queue.length)} / {queue.length}
              </>
            ) : (
              '—'
            )}
          </div>
          <div className="uppercase tracking-wider">{os}</div>
        </div>
      </div>

      {error ? (
        <Panel className="border border-red-500/20 bg-red-500/5">
          <div className="text-sm text-white/80">Could not load this pack.</div>
          <div className="mt-2 text-xs text-white/45">{error}</div>
        </Panel>
      ) : null}

      {done ? (
        <Panel className="text-center">
          <div className="text-2xl font-semibold text-strong">Finished</div>
          <div className="mt-2 text-sm text-white/60">Restart to train again.</div>
          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={restart}
              className="rounded-xl bg-violet-500/90 px-5 py-2.5 text-sm font-semibold text-white hover:bg-violet-500"
            >
              Restart set
            </button>
          </div>
        </Panel>
      ) : (
        <Panel
          className={[
            'transition',
            hit === 'good' ? 'ring-2 ring-green-500/60 bg-green-500/6' : '',
            hit === 'bad' ? 'ring-2 ring-red-500/60 bg-red-500/6' : '',
          ].join(' ')}
        >
          <div className="text-xs text-white/45">Action</div>
          <div className="mt-1 text-2xl font-semibold tracking-tight text-strong">
            {current?.action ?? '…'}
          </div>

          <div className="mt-6 text-xs text-white/45">Keys</div>
          {expected ? (
            <div className="mt-2 flex flex-wrap gap-2">
              {expected.map((k, i) => (
                <KeyCap key={`${k}-${i}`} label={k} />
              ))}
            </div>
          ) : (
            <div className="mt-2 text-sm text-white/60">
              This action has no keys for <span className="text-strong">{os}</span>.
            </div>
          )}

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-xl bg-black/20 p-4 ring-1 ring-white/10">
              <div className="text-xs text-white/45">Your last input</div>
              <div className="mt-2 flex flex-wrap gap-2">
                {last ? last.map((k, i) => <KeyCap key={`${k}-${i}`} label={k} />) : <span className="text-sm text-white/40">—</span>}
              </div>
            </div>
            <div className="rounded-xl bg-black/20 p-4 ring-1 ring-white/10">
              <div className="text-xs text-white/45">Tip</div>
              <div className="mt-2 text-sm text-white/65">
                Click anywhere and press the combo. We prevent default browser shortcuts while
                training.
              </div>
            </div>
          </div>
        </Panel>
      )}
    </div>
  )
}

