import Header from '@/components/Header'
import Message from '@/components/Message'
import PostsList from '@/components/PostsList'

import { usePosts } from '@/hooks/usePosts'

function App() {
  const { posts, loading, error } = usePosts()

  return (
    <>
      <Header />

      <main>
        {error ? (
          <Message
            variant="error"
            title="Failed to load posts"
            description={error}
          />
        ) : (
          <PostsList posts={posts} loading={loading} />
        )}
      </main>
    </>
  )
}

export default App
