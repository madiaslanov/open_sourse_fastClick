import type { ReactNode } from 'react'

export function Panel({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={[
        'rounded-2xl bg-white/5 p-5 ring-1 ring-white/10',
        'shadow-[0_20px_60px_rgba(0,0,0,0.30)]',
        className ?? '',
      ].join(' ')}
    >
      {children}
    </div>
  )
}

