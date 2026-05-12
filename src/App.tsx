import { usePosts } from '@/hooks/usePosts'

import Header from '@/components/Header'
import Message from '@/components/Message'
import PostsList from '@/components/PostsList'

import { useSearchParam } from './hooks/useSearchParam'

function App() {
  const [search, setSearch] = useSearchParam()
  const { posts, loading, error } = usePosts()

  return (
    <>
      <Header search={search} setSearch={setSearch} />

      <main>
        {error ? (
          <Message
            variant="error"
            title="Failed to load posts"
            description={error}
          />
        ) : (
          <PostsList posts={posts} loading={loading} search={search} />
        )}
      </main>
    </>
  )
}

export default App
