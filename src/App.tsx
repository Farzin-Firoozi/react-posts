import { usePosts } from './hooks/usePosts'
import PostCard from './components/PostCard'

function App() {
  const { posts, loading, error } = usePosts()

  if (loading) return <main><p>Loading…</p></main>
  if (error) return <main><p>Error: {error}</p></main>

  return (
    <main>
      {posts.map((post, i) => (
        <PostCard key={i} post={post} />
      ))}
    </main>
  )
}

export default App
