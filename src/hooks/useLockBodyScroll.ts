import { useEffect } from 'react'

interface UseLockBodyScrollParams {
  locked: boolean
}
export function useLockBodyScroll(params: UseLockBodyScrollParams) {
  const { locked } = params

  useEffect(() => {
    if (!locked) return

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previous
    }
  }, [locked])
}
