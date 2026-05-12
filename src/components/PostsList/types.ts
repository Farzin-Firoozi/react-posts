import type { Post } from '../../hooks/usePosts'

export interface PostsListProps {
  posts: Post[]
  loading?: boolean
  search?: string
}
