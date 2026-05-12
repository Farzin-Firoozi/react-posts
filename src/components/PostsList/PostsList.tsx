import type { FC } from 'react'

import type { Post } from '@/hooks/usePosts'
import { useAutoAnimate } from '@formkit/auto-animate/react'

import Message from '@/components/Message'
import PostCard from '@/components/PostCard'

import styles from './PostsList.module.scss'

const SKELETON_COUNT = 6

interface PostsListProps {
  posts: Post[]
  loading?: boolean
  search?: string
}

const PostsList: FC<PostsListProps> = (props) => {
  const { posts, loading = false, search } = props

  const [gridRef] = useAutoAnimate<HTMLDivElement>()

  const filtered = search
    ? posts.filter(
        (p) =>
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.tags.toLowerCase().includes(search.toLowerCase()),
      )
    : posts

  const isEmpty = !loading && filtered.length === 0

  return (
    <section className={styles.section}>
      {isEmpty ? (
        <Message
          title={search ? 'No results found' : 'No posts yet'}
          description={search ? `Nothing matched "${search}"` : undefined}
        />
      ) : (
        <div ref={gridRef} className={styles.grid}>
          {loading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                <div key={i} className={styles.item}>
                  <PostCard.Skeleton />
                </div>
              ))
            : filtered.map((post, i) => (
                <div key={post.title + i} className={styles.item}>
                  <PostCard post={post} />
                </div>
              ))}
        </div>
      )}
    </section>
  )
}

export default PostsList
