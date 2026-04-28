export function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(1, value))
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
      <div
        className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
        style={{ width: `${v * 100}%` }}
      />
    </div>
  )
}

