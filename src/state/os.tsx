import React, { createContext, useContext, useMemo, useState } from 'react'

export type OS = 'mac' | 'windows' | 'linux'

type OsState = {
  os: OS
  setOs: (os: OS) => void
}

const OsContext = createContext<OsState | null>(null)

const STORAGE_KEY = 'openShortcut.os'

function getInitialOs(): OS {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'mac' || stored === 'windows' || stored === 'linux') return stored

  const isMac =
    typeof navigator !== 'undefined' &&
    /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent)
  return isMac ? 'mac' : 'windows'
}

export function OsProvider({ children }: { children: React.ReactNode }) {
  const [os, setOsState] = useState<OS>(() => getInitialOs())

  const setOs = (next: OS) => {
    setOsState(next)
    localStorage.setItem(STORAGE_KEY, next)
  }

  const value = useMemo(() => ({ os, setOs }), [os])
  return <OsContext.Provider value={value}>{children}</OsContext.Provider>
}

export function useOs() {
  const ctx = useContext(OsContext)
  if (!ctx) throw new Error('useOs must be used within OsProvider')
  return ctx
}

