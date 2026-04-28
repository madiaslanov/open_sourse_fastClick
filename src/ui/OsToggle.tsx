import { useOs, type OS } from '../state/os'

const options: Array<{ id: OS; label: string }> = [
  { id: 'mac', label: 'Mac' },
  { id: 'windows', label: 'Windows' },
  { id: 'linux', label: 'Linux' },
]

export function OsToggle() {
  const { os, setOs } = useOs()

  return (
    <div className="flex items-center rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => setOs(o.id)}
          className={[
            'px-3 py-1.5 text-xs font-medium transition',
            'rounded-lg',
            os === o.id
              ? 'bg-white/12 text-strong ring-1 ring-white/15'
              : 'text-white/60 hover:text-white/80',
          ].join(' ')}
          aria-pressed={os === o.id}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}

