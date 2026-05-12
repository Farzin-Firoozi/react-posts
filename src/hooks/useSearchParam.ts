import { useEffect, useState } from 'react'
import { useDebounce } from './useDebounce'

export function useSearchParam(
  key = 'q',
  delay = 300,
): [string, (val: string) => void] {
  const [value, setValue] = useState(
    () => new URLSearchParams(window.location.search).get(key) ?? '',
  )

  const debounced = useDebounce(value, delay)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    if (debounced) params.set(key, debounced)
    else params.delete(key)

    const qs = params.toString()

    window.history.replaceState(
      null,
      '',
      qs ? `?${qs}` : window.location.pathname,
    )
  }, [key, debounced])

  return [value, setValue]
}
