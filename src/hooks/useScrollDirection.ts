import { useEffect, useRef, useState } from 'react'

export type ScrollDirection = 'up' | 'down' | 'idle'

export interface ScrollState {
  direction: ScrollDirection
  scrollY: number
  isAtTop: boolean
}

export function useScrollDirection(threshold = 4, idleDelay = 500): ScrollState {
  const [state, setState] = useState<ScrollState>({
    direction: 'idle',
    scrollY: 0,
    isAtTop: true,
  })

  const lastY = useRef(0)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    lastY.current = window.scrollY

    function onScroll() {
      const y = window.scrollY
      const isAtTop = y <= 0
      const delta = y - lastY.current

      if (idleTimer.current) clearTimeout(idleTimer.current)

      idleTimer.current = setTimeout(() => {
        setState(prev => ({ ...prev, direction: 'idle' }))
      }, idleDelay)

      if (Math.abs(delta) < threshold && !isAtTop) {
        lastY.current = y
        return
      }

      const direction: ScrollDirection = isAtTop ? 'idle' : delta > 0 ? 'down' : 'up'

      setState(prev => {
        if (prev.direction === direction && prev.scrollY === y) return prev
        return { direction, scrollY: y, isAtTop }
      })

      lastY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [threshold, idleDelay])

  return state
}
