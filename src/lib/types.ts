import type { OS } from '../state/os'

export type Difficulty = 'easy' | 'medium' | 'hard'

export type ShortcutKey = string

export type Shortcut = {
  action: string
  keys: Partial<Record<OS, ShortcutKey[]>>
}

export type ShortcutPack = {
  id: string
  name: string
  shortcuts: Shortcut[]
}

export type ShortcutIndexEntry = {
  id: string
  name: string
}

export type ShortcutIndex =
  | ShortcutIndexEntry[]
  | {
      apps: ShortcutIndexEntry[]
    }

