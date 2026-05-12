import { usePosts } from './hooks/usePosts'
import PostsList from './components/PostsList'

function App() {
  const { posts, loading, error } = usePosts()

  if (error) return <main><p>Error: {error}</p></main>

  return (
    <main>
      <PostsList posts={posts} loading={loading} />
    </main>
  )
}

export default App
