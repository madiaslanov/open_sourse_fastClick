import type { Difficulty } from '../lib/types'

const options: Array<{ id: Difficulty; label: string }> = [
  { id: 'easy', label: 'Easy' },
  { id: 'medium', label: 'Medium' },
  { id: 'hard', label: 'Hard' },
]

export function DifficultyToggle({
  value,
  onChange,
}: {
  value: Difficulty
  onChange: (d: Difficulty) => void
}) {
  return (
    <div className="flex items-center rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          className={[
            'px-3 py-1.5 text-xs font-medium transition',
            'rounded-lg',
            value === o.id
              ? 'bg-white/12 text-strong ring-1 ring-white/15'
              : 'text-white/60 hover:text-white/80',
          ].join(' ')}
          aria-pressed={value === o.id}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
