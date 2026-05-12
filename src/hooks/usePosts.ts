import { useEffect, useState } from 'react'

export interface Post {
  title: string
  text: string
  tags: string
  autor: string
  img: string
  img_2x: string
  date: string
  views: string
}

interface UsePostsResult {
  posts: Post[]
  loading: boolean
  error: string | null
}

const API_URL = 'https://cloud.codesupply.co/endpoint/react/data.json'

export function usePosts(): UsePostsResult {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function fetchPosts() {
      try {
        const res = await fetch(API_URL)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data: Post[] = await res.json()
        if (!cancelled) setPosts(data)
      } catch (err) {
        if (!cancelled)
          setError(err instanceof Error ? err.message : 'Failed to fetch posts')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchPosts()
    return () => {
      cancelled = true
    }
  }, [])

  return { posts, loading, error }
}
