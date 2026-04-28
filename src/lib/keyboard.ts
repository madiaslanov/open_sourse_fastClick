import type { OS } from '../state/os'

const keyAliases: Record<string, string> = {
  ' ': 'Space',
  Spacebar: 'Space',
  Esc: 'Escape',
  Del: 'Delete',
  Left: 'ArrowLeft',
  Right: 'ArrowRight',
  Up: 'ArrowUp',
  Down: 'ArrowDown',
  Cmd: 'Cmd',
  Command: 'Cmd',
  Meta: 'Cmd',
  Win: 'Win',
  Option: 'Alt',
}

export function normalizeExpectedKey(label: string, os: OS): string {
  const trimmed = label.trim()
  const aliased = keyAliases[trimmed] ?? trimmed

  if (aliased === 'Ctrl' || aliased === 'Control') return 'Ctrl'
  if (aliased === 'Shift') return 'Shift'
  if (aliased === 'Alt') return 'Alt'
  if (aliased === 'Cmd') return os === 'windows' || os === 'linux' ? 'Win' : 'Cmd'
  if (aliased === 'Win') return 'Win'

  if (aliased.length === 1) return aliased.toUpperCase()
  return aliased
}

export function eventToCombo(e: KeyboardEvent, os: OS): string[] {
  // We intentionally ignore pure modifier presses (Shift/Alt/Ctrl/Meta).
  const key = normalizeEventKey(e)
  const isModifierOnly = ['Shift', 'Alt', 'Control', 'Meta'].includes(e.key)
  if (isModifierOnly) return []

  const parts: string[] = []
  if (os === 'mac') {
    if (e.metaKey) parts.push('Cmd')
    if (e.ctrlKey) parts.push('Ctrl')
  } else {
    if (e.ctrlKey) parts.push('Ctrl')
    if (e.metaKey) parts.push('Win')
  }
  if (e.altKey) parts.push('Alt')
  if (e.shiftKey) parts.push('Shift')

  if (key) parts.push(key)
  return parts
}

function normalizeEventKey(e: KeyboardEvent): string {
  const raw = e.key
  const aliased = keyAliases[raw] ?? raw

  if (aliased === 'Enter') return 'Enter'
  if (aliased === 'Tab') return 'Tab'
  if (aliased === 'Escape') return 'Escape'
  if (aliased === 'Backspace') return 'Backspace'
  if (aliased === 'Delete') return 'Delete'
  if (aliased.startsWith('Arrow')) return aliased
  if (aliased === 'Space') return 'Space'

  if (aliased.length === 1) return aliased.toUpperCase()
  return aliased
}

export function comboEquals(a: string[], b: string[]) {
  if (a.length !== b.length) return false
  const as = [...a].sort().join('|')
  const bs = [...b].sort().join('|')
  return as === bs
}

