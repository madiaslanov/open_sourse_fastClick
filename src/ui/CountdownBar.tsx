import { useEffect, useRef, useState } from 'react'

export function CountdownBar({
  duration,
  onExpire,
}: {
  duration: number
  onExpire: () => void
}) {
  const [fraction, setFraction] = useState(1)
  const startRef = useRef(0)
  const rafRef = useRef(0)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    startRef.current = performance.now()
    const durationMs = duration * 1000

    const tick = (now: number) => {
      const elapsed = now - startRef.current
      const remaining = Math.max(0, 1 - elapsed / durationMs)
      setFraction(remaining)

      if (remaining <= 0) {
        onExpireRef.current()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [duration])

  const color =
    fraction > 0.5
      ? 'bg-green-500'
      : fraction > 0.25
        ? 'bg-yellow-500'
        : 'bg-red-500'

  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
      <div
        className={`h-full transition-colors duration-300 ${color}`}
        style={{ width: `${fraction * 100}%` }}
      />
    </div>
  )
}
