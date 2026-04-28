import type { ShortcutIndex, ShortcutIndexEntry, ShortcutPack } from './types'

function baseUrl() {
  const env = (import.meta as any).env?.VITE_SHORTCUTS_BASE_URL as string | undefined
  const raw = env?.trim()
  // Default: local files served from /public/shortcuts
  const fallback = '/shortcuts/'
  const url = raw && raw.length > 0 ? raw : fallback
  return url.endsWith('/') ? url : `${url}/`
}

function cacheKey(path: string) {
  return `openShortcut.cache:${path}`
}

async function fetchJson<T>(path: string): Promise<T> {
  const url = `${baseUrl()}${path}`
  const key = cacheKey(path)

  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = (await res.json()) as T
    localStorage.setItem(key, JSON.stringify({ at: Date.now(), data }))
    return data
  } catch (e) {
    const cached = localStorage.getItem(key)
    if (cached) {
      try {
        return JSON.parse(cached).data as T
      } catch {
        // ignore
      }
    }
    throw e
  }
}

export async function getShortcutIndex(): Promise<ShortcutIndexEntry[]> {
  const raw = await fetchJson<ShortcutIndex>('index.json')
  const apps = Array.isArray(raw) ? raw : raw.apps
  return apps
}

export async function getShortcutPack(appId: string): Promise<ShortcutPack> {
  const pack = await fetchJson<ShortcutPack>(`${appId}.json`)
  return pack
}

