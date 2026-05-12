import { usePosts } from './hooks/usePosts'
import { useSearchParam } from './hooks/useSearchParam'
import Header from './components/Header'
import PostsList from './components/PostsList'
import Message from './components/Message'

function App() {
  const { posts, loading, error } = usePosts()
  const [search, setSearch] = useSearchParam()

  return (
    <>
      <Header search={search} onSearchChange={setSearch} />
      <main>
        {error
          ? <Message variant="error" title="Failed to load posts" description={error} />
          : <PostsList posts={posts} loading={loading} search={search} />
        }
      </main>
    </>
  )
}

export default App
