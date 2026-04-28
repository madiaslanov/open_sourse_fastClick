export function KeyCap({ label }: { label: string }) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center',
        'rounded-lg bg-white/8 px-3 py-2 text-sm font-semibold text-strong',
        'ring-1 ring-white/12 shadow-[inset_0_-1px_0_rgba(0,0,0,0.35)]',
        'min-w-10',
      ].join(' ')}
    >
      {label}
    </span>
  )
}

