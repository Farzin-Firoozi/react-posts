/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'

interface UseKeyEvent {
  key: KeyboardEvent['key']
  onKey: (e: KeyboardEvent) => void
}

export function useKeyEvent(
  params: UseKeyEvent,
  deps: React.DependencyList = [],
) {
  const { key, onKey } = params

  function handleKey(e: KeyboardEvent) {
    if (e.key === key) onKey(e)
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKey)

    return () => window.removeEventListener('keydown', handleKey)
  }, [...deps])
}
